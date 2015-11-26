using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gradera_Klubb.Models.Grading
{
    public class GradingCategoryModel
    {
        public int Id { get; set; }
        public int ClubId { get; set; }
        public string Name { get; set; }

        public static GradingCategoryModel MapGategory(Gradera.Grading.DAL.Grade_Category category)
        {
            return new GradingCategoryModel()
            {
                ClubId = category.ClubId,
                Id = category.Id,
                Name = category.Name
            };
        }

        public static List<GradingCategoryModel> MapCategories(List<Gradera.Grading.DAL.Grade_Category> categories)
        {
            List<GradingCategoryModel> models = new List<GradingCategoryModel>();
            categories.ForEach(c => models.Add(MapGategory(c)));
            return models;
        }

        public static Gradera.Grading.DAL.Grade_Category MapToDal(GradingCategoryModel model)
        {
            return new Gradera.Grading.DAL.Grade_Category()
            {
                ClubId = model.ClubId,
                Id = model.Id,
                Name = model.Name
            };
        }
    }
}