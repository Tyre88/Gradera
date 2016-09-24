using Gradera.Competition.DAL;
using Gradera.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gradera_Klubb.Models.Competition
{
    public class CompetitionCompeditorModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int BirthYear { get; set; }
        public int Grade { get; set; }
        public CompetitionCategoryModel Category { get; set; }
        public bool IsExternal { get; set; }
        public Gender Gender { get; set; }
        public string ClubName { get; set; }
        public string Weight { get; set; }
        public string Image { get; set; }

        public CompetitionCompeditorModel() { }

        public CompetitionCompeditorModel(Competition_External_Competitor externalCompeditor)
        {
            Id = externalCompeditor.Id;
            FirstName = externalCompeditor.FirstName;
            LastName = externalCompeditor.LastName;
            IsExternal = true;
            Category = new CompetitionCategoryModel()
            {
                Id = externalCompeditor.Competition_Category.Id,
                Name = externalCompeditor.Competition_Category.Name
            };
            BirthYear = externalCompeditor.BirthYear;
            Grade = externalCompeditor.Grade;
            ClubName = externalCompeditor.Competition_External_Competitor_Contact_Person.Club;
            Gender = (Gender)externalCompeditor.Gender;
            Weight = externalCompeditor.Weight;
        }

        public static List<CompetitionCompeditorModel> MapExternalCompeditors(List<Competition_External_Competitor> compeditors)
        {
            List<CompetitionCompeditorModel> models = new List<CompetitionCompeditorModel>();
            foreach (var item in compeditors)
            {
                models.Add(new CompetitionCompeditorModel(item));
            }
            return models;
        }
    }
}