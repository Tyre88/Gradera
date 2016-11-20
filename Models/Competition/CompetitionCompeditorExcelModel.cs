using Gradera.Core.DAL;
using Gradera.Core.BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Gradera.Core.Enums;

namespace Gradera_Klubb.Models.Competition
{
    public class CompetitionCompeditorExcelModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int BirthYear { get; set; }
        public string Grade { get; set; }
        public string Category { get; set; }
        public string Weight { get; set; }
        public string ClubName { get; set; }
        public string Gender { get; set; }

        public static CompetitionCompeditorExcelModel MapCompetitionCompeditor(CompetitionCompeditorModel compeditor)
        {
            string grade = string.Empty;

            switch ((Gradera.Core.Enums.Grade)compeditor.Grade)
            {
                case Gradera.Core.Enums.Grade.Kyu6:
                    grade = "6k";
                    break;
                case Gradera.Core.Enums.Grade.Kyu5:
                    grade = "5k";
                    break;
                case Gradera.Core.Enums.Grade.Kyu4:
                    grade = "4k";
                    break;
                case Gradera.Core.Enums.Grade.Kyu3:
                    grade = "3k";
                    break;
                case Gradera.Core.Enums.Grade.Kyu2:
                    grade = "2k";
                    break;
                case Gradera.Core.Enums.Grade.Kyu1:
                    grade = "1k";
                    break;
                case Gradera.Core.Enums.Grade.Dan1:
                    grade = "1d";
                    break;
                case Gradera.Core.Enums.Grade.Dan2:
                    grade = "2d";
                    break;
                case Gradera.Core.Enums.Grade.Dan3:
                    grade = "3d";
                    break;
                case Gradera.Core.Enums.Grade.Dan4:
                    grade = "4d";
                    break;
                case Gradera.Core.Enums.Grade.Dan5:
                    grade = "5d";
                    break;
                case Gradera.Core.Enums.Grade.Dan6:
                    grade = "6d";
                    break;
                case Gradera.Core.Enums.Grade.Dan7:
                    grade = "7d";
                    break;
                case Gradera.Core.Enums.Grade.Dan8:
                    grade = "8d";
                    break;
                case Gradera.Core.Enums.Grade.Dan9:
                    grade = "9d";
                    break;
                case Gradera.Core.Enums.Grade.Dan10:
                    grade = "10d";
                    break;
                default:
                    break;
            }

            return new CompetitionCompeditorExcelModel()
            {
                BirthYear = compeditor.BirthYear,
                Category = compeditor.Category.Name,
                ClubName = compeditor.ClubName,
                Gender = compeditor.Gender == Gradera.Core.Enums.Gender.Man ? "Man" : "Kvinna",
                FirstName = compeditor.FirstName,
                LastName = compeditor.LastName,
                Weight = compeditor.Weight,
                Grade = grade
            };
        }

        public static List<CompetitionCompeditorExcelModel> MapCompetitionCompeditors(List<CompetitionCompeditorModel> compeditors)
        {
            List<CompetitionCompeditorExcelModel> models = new List<CompetitionCompeditorExcelModel>();
            compeditors.ForEach(c => models.Add(MapCompetitionCompeditor(c)));
            return models.OrderBy(m => m.Category).ThenBy(m => m.Gender).ThenBy(m => m.Weight).ToList();
        }
    }
}