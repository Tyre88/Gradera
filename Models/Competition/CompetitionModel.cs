using Gradera.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gradera_Klubb.Models.Competition
{
    public class CompetitionModel
    {
        public int Id { get; set; }
        public int ClubId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime EndSignupDate { get; set; }
        public DateTime StartSignupDate { get; set; }
        public string Location { get; set; }
        public bool IsExternal { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsGlobal { get; set; }
        public bool IsClubCompetition { get; set; }
        public int? CreatedBy { get; set; }

        public bool IsActive
        {
            get
            {
                return StartSignupDate < DateTime.Now && EndSignupDate > DateTime.Now;
            }
        }

        public List<CompetitionCategoryModel> Categories { get; set; }
        public List<CompetitionCompeditorModel> Compeditors { get; set; }

        public CompetitionModel()
        {
            Categories = new List<CompetitionCategoryModel>();
            Compeditors = new List<CompetitionCompeditorModel>();
        }

        public static CompetitionModel MapCompetition(Gradera.Competition.DAL.Competition competition)
        {
            CompetitionModel model = new CompetitionModel();
            if (competition != null)
            {
                model = new CompetitionModel()
                {
                    Id = competition.Id,
                    ClubId = competition.ClubId,
                    Description = competition.Description,
                    EndDate = competition.EndDate,
                    EndSignupDate = competition.EndSignupDate,
                    StartSignupDate = competition.StartSignupDate,
                    IsDeleted = competition.IsDeleted,
                    IsExternal = competition.IsExternal,
                    Location = competition.Location,
                    Name = competition.Name,
                    StartDate = competition.StartDate,
                    IsGlobal = competition.IsGlobal,
                    IsClubCompetition = competition.IsClubCompetition,
                    CreatedBy = competition.CreatedBy
                };


                try
                {
                    competition.Competition_Category.ToList().ForEach(c => model.Categories.Add(new CompetitionCategoryModel()
                    {
                        Id = c.Id,
                        Name = c.Name
                    }));
                }
                catch (Exception)
                {
                }
                
            }

            return model;
        }

        public static CompetitionModel MapCompetitionDeep(Gradera.Competition.DAL.Competition competition)
        {
            CompetitionModel model = MapCompetition(competition);

            foreach (var c in competition.Competition_Internal_Competitor)
            {
                Gradera.Core.DAL.Account acc = Gradera.Core.BLL.AccountBLL.GetUser(c.AccountId);

                model.Compeditors.Add(new CompetitionCompeditorModel()
                {
                    Id = c.Id,
                    FirstName = acc.FirstName,
                    LastName = acc.LastName,
                    IsExternal = false,
                    Category = new CompetitionCategoryModel()
                    {
                        Id = c.Competition_Category.Id,
                        Name = c.Competition_Category.Name
                    },
                    BirthYear = acc.Account_Information.FirstOrDefault().Birthday.Year,
                    Grade = acc.Account_Information.FirstOrDefault().Grade,
                    UserId = acc.ID,
                    ClubName = acc.Club.Name,
                    Gender = (Gender)acc.Gender,
                    Weight = acc.Account_Information.FirstOrDefault().Weight,
                    Image = acc.Image
                });
            }

            //competition.Competition_Internal_Competitor.ToList().ForEach(c => model.Compeditors.Add(new CompetitionCompeditorModel()
            //{
            //     Id = c.Id,
            //     FirstName = c.Account.FirstName,
            //     LastName = c.Account.LastName,
            //     IsExternal = false,
            //     Category = new CompetitionCategoryModel()
            //     {
            //         Id = c.Competition_Category.Id,
            //         Name = c.Competition_Category.Name
            //     },
            //     BirthYear = c.Account.Account_Information.FirstOrDefault().Birthday.Year,
            //     Grade = c.Account.Account_Information.FirstOrDefault().Grade
            //}));

            if(competition.IsExternal)
            {
                competition.Competition_External_Competitor.ToList().ForEach(c => model.Compeditors.Add(new CompetitionCompeditorModel()
                {
                    Id = c.Id,
                    FirstName = c.FirstName,
                    LastName = c.LastName,
                    IsExternal = true,
                    Category = new CompetitionCategoryModel()
                    {
                        Id = c.Competition_Category.Id,
                        Name = c.Competition_Category.Name
                    },
                    BirthYear = c.BirthYear,
                    Grade = c.Grade,
                    ClubName = c.Competition_External_Competitor_Contact_Person.Club,
                    Gender = (Gender)c.Gender,
                    Weight = c.Weight
                }));
            }

            return model;
        }

        public static List<CompetitionModel> MapCompetitions(List<Gradera.Competition.DAL.Competition> competitions)
        {
            List<CompetitionModel> models = new List<CompetitionModel>();
            competitions.ForEach(c => models.Add(MapCompetition(c)));
            return models;
        }

        public static Gradera.Competition.DAL.Competition MapCompetitionToDAL(CompetitionModel model)
        {
            Gradera.Competition.DAL.Competition competition = new Gradera.Competition.DAL.Competition()
            {
                Id = model.Id,
                Description = model.Description,
                EndDate = model.EndDate,
                StartDate = model.StartDate,
                Name = model.Name,
                EndSignupDate = model.EndSignupDate,
                IsDeleted = model.IsDeleted,
                IsExternal = model.IsExternal,
                Location = model.Location,
                StartSignupDate = model.StartSignupDate,
                IsGlobal = model.IsGlobal,
                IsClubCompetition = model.IsClubCompetition,
                CreatedBy = model.CreatedBy
            };

            return competition;
        }
    }
}