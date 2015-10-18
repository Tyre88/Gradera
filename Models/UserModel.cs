using Core.BLL;
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
        public string Email { get; set; }
        public string Token { get; set; }
        public CompoundModel Compound { get; set; }
        public List<AccessrightRightModel> AccessRights { get; set; }
        public string FullName { get { return string.Format("{0} {1}", FirstName, LastName); } }

        public UserModel()
        {
            Compound = new CompoundModel();
            AccessRights = new List<AccessrightRightModel>();
        }

        public static UserModel MapUserModel(Account account, bool deepLoad)
        {
            if(account != null)
            {
                UserModel userModel = new UserModel()
                {
                    Id = account.ID,
                    FirstName = account.FirstName,
                    LastName = account.LastName,
                    Username = account.UserName,
                    Image = account.Image
                };

                userModel.Compound = new CompoundModel()
                {
                    Id = account.ClubId,
                    Name = account.Club.Name,
                    ShortName = account.Club.ShortName,
                    Image = account.Club.Image
                };

                if (deepLoad)
                {
                    userModel.Token = AccountBLL.GetUserSession(account.ID);

                    foreach (var item in account.AccountAccess)
                    {
                        foreach (var right in item.Accessright.Accessright_Right)
                        {
                            userModel.AccessRights.Add(new AccessrightRightModel()
                            {
                                AccessType = (AccessType)right.AccessType,
                                AccessTypeRight = (AccessTypeRight)right.AccessTypeRight,
                                Id = right.Id
                            });
                        }
                    }
                }

                return userModel;
            }

            return null;
        }

        public static List<UserModel> MapUserModels(List<Account> accounts)
        {
            ConcurrentBag<UserModel> userModels = new ConcurrentBag<UserModel>();
            Parallel.ForEach(accounts, account =>
            {
                userModels.Add(MapUserModel(account, false));
            });
            return userModels.ToList().OrderBy(u => u.Id).ToList();
        }
    }
}