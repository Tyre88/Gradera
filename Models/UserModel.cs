﻿using Core.BLL;
using Core.DAL;
using Core.Enums;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Gradera_Klubb.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Image { get; set; }
        public string Token { get; set; }
        public string Password { get; set; }
        public int ClubId { get; set; }
        public UserInformationModel UserInformation { get; set; }
        public ClubModel Club { get; set; }
        public List<AccountAccessModel> AccountAccess { get; set; }
        public List<AccessrightModel> AccessRights { get; set; }
        public List<AccessrightRightModel> AccessRightsRight { get; set; }
        public string FullName { get { return string.Format("{0} {1}", FirstName, LastName); } }

        public UserModel()
        {
            Club = new ClubModel();
            AccessRightsRight = new List<AccessrightRightModel>();
            AccessRights = new List<AccessrightModel>();
            UserInformation = new UserInformationModel();
        }

        public static UserModel MapUserModel(Account account, bool deepLoad, bool loadUserInformation = false)
        {
            if(account != null)
            {
                UserModel userModel = new UserModel()
                {
                    Id = account.ID,
                    FirstName = account.FirstName,
                    LastName = account.LastName,
                    Username = account.UserName,
                    Image = account.Image,
                    ClubId = account.ClubId
                };

                userModel.Club = new ClubModel()
                {
                    Id = account.ClubId,
                    Name = account.Club.Name,
                    ShortName = account.Club.ShortName,
                    Image = account.Club.Image
                };

                if (deepLoad)
                {
                    Parallel.Invoke(() =>
                    {
                        userModel.Token = AccountBLL.GetUserSession(account.ID);
                    }, () =>
                    {
                        foreach (var item in account.AccountAccess)
                        {
                            foreach (var right in item.Accessright.Accessright_Right)
                            {
                                userModel.AccessRightsRight.Add(new AccessrightRightModel()
                                {
                                    AccessType = (AccessType)right.AccessType,
                                    AccessTypeRight = (AccessTypeRight)right.AccessTypeRight,
                                    Id = right.Id
                                });
                            }
                        }
                    }, () =>
                    {
                        foreach (var item in account.AccountAccess)
                        {
                            userModel.AccessRights.Add(new AccessrightModel()
                            {
                                Id = item.Accessright.ID,
                                Name = item.Accessright.Name,
                                Description = item.Accessright.Description
                            });
                        }
                    }, () =>
                    {
                        Account_Information information = AccountBLL.GetAccountSettings(userModel.Id);
                        if(information != null)
                        {
                            userModel.UserInformation = new UserInformationModel()
                            {
                                Email = information.Email,
                                City = information.City,
                                Occupation = information.Occupation,
                                Phone = information.Phone,
                                Street = information.Street,
                                Zip = information.Zip
                            };
                        }
                    }, () =>
                    {
                        userModel.AccountAccess = AccountAccessModel.MapAccountAccesses(AccountBLL.GetAccountAccesses(userModel.Id));
                    });
                }
                else if(loadUserInformation)
                {
                    Account_Information information = AccountBLL.GetAccountSettings(userModel.Id);
                    if (information != null)
                    {
                        userModel.UserInformation = new UserInformationModel()
                        {
                            Email = information.Email,
                            City = information.City,
                            Occupation = information.Occupation,
                            Phone = information.Phone,
                            Street = information.Street,
                            Zip = information.Zip
                        };
                    }
                }

                return userModel;
            }

            return null;
        }

        internal static Account ConvertToAccount(UserModel user)
        {
            Account acc = new Account()
            {
                ID = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Password = user.Password,
                UserName = user.Username,
                Image = user.Image,
                ClubId = user.Club.Id
            };

            acc.Account_Information.Add(new Account_Information()
            {
                Email = user.UserInformation.Email,
                City = user.UserInformation.City,
                Occupation = user.UserInformation.Occupation,
                Phone = user.UserInformation.Phone,
                Street = user.UserInformation.Street,
                Zip = user.UserInformation.Zip
            });

            foreach (var access in user.AccountAccess)
            {
                acc.AccountAccess.Add(new AccountAccess()
                {
                    ID = access.Id,
                    AccessID = access.AccessId,
                    AccountID = user.Id
                });
            }

            return acc;
        }

        public static List<UserModel> MapUserModels(List<Account> accounts)
        {
            return MapUserModels(accounts, false, false);
        }

        public static List<UserModel> MapUserModels(List<Account> accounts, bool deepLoad, bool loadInformation)
        {
            ConcurrentBag<UserModel> userModels = new ConcurrentBag<UserModel>();
            Parallel.ForEach(accounts, account =>
            {
                userModels.Add(MapUserModel(account, deepLoad, loadInformation));
            });
            return userModels.ToList().OrderBy(u => u.Id).ToList();
        }
    }
}