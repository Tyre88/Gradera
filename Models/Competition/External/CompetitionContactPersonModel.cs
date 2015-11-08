using Gradera.Competition.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gradera_Klubb.Models.Competition.External
{
    public class CompetitionContactPersonModel
    {
        public int CompetitionId { get; set; }
        public string Club { get; set; }
        public string Coaches { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public List<CompetitionExternalCompeditorModel> Compeditors { get; set; }

        public CompetitionContactPersonModel()
        {
            Compeditors = new List<CompetitionExternalCompeditorModel>();
        }

        public static Competition_External_Competitor_Contact_Person MapToContactPerson(CompetitionContactPersonModel model)
        {
            Competition_External_Competitor_Contact_Person contactPerson = new Competition_External_Competitor_Contact_Person()
            {
                Coaches = model.Coaches,
                Club = model.Club,
                CompetitionId = model.CompetitionId,
                Email = model.Email,
                Message = model.Message,
                Name = model.Name,
                Phone = model.Phone
            };

            foreach (var compeditor in model.Compeditors)
            {
                contactPerson.Competition_External_Competitor.Add(new Competition_External_Competitor()
                {
                    BirthYear = compeditor.Birthyear,
                    CategoryId = compeditor.Category,
                    CompetitionId = model.CompetitionId,
                    FirstName = compeditor.FirstName,
                    Gender = compeditor.Gender,
                    Grade = (int)compeditor.Grade,
                    LastName = compeditor.LastName,
                    Weight = compeditor.Weight
                });
            }

            return contactPerson;
        }
    }
}