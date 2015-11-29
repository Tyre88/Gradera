using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Gradera.Grading.DAL;

namespace Gradera_Klubb.Models.Grading
{
    public class GradeModel
    {
        public int Id { get; set; }
        public int ClubId { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public List<GradeCategoryLinkModel> GradeCategoryLinks { get; set; }

        public GradeModel()
        {
            GradeCategoryLinks = new List<GradeCategoryLinkModel>();
        }

        public static List<GradeModel> MapGradeModels(List<Gradera.Grading.DAL.Grade> grades)
        {
            List<GradeModel> models = new List<GradeModel>();
            grades.ForEach(g => models.Add(MapGradeModel(g)));
            return models;
        }

        public static GradeModel MapGradeModel(Grade grade)
        {
            return new GradeModel()
            {
                ClubId = grade.ClubId,
                Id = grade.Id,
                Image = grade.Image,
                Name = grade.Name
            };
        }

        public static Grade MapGradeDal(GradeModel model)
        {
            return new Grade()
            {
                ClubId = model.ClubId,
                Id = model.Id,
                Image = model.Image,
                Name = model.Name
            };
        }
    }
}