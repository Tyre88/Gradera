using Gradera.Core.BLL;
using Gradera.Grading.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gradera_Klubb.Models.Grading
{
    public class GradingBookletModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsGlobal { get; set; }
        public bool IsDeleted { get; set; }
        public int ClubId { get; set; }
        public List<GradeModel> Grades { get; set; }

        public GradingBookletModel()
        {
            Grades = new List<GradeModel>();
        }

        public static GradingBookletModel MapBookletModel(GradingBooklet booklet, bool deepLoad = false)
        {
            GradingBookletModel model = new GradingBookletModel()
            {
                Description = booklet.Description,
                Id = booklet.Id,
                IsDeleted = booklet.IsDeleted,
                IsGlobal = booklet.IsGlobal,
                Name = booklet.Name,
                ClubId = booklet.ClubId
            };

            if(deepLoad)
            {
                model.Grades = GradeModel.MapGradeModels(Gradera.Grading.BLL.GradingBLL.GetGradesToBooklet(model.Id), true);
            }

            return model;
        }

        public static List<GradingBookletModel> MapBookletModels(List<GradingBooklet> booklets)
        {
            List<GradingBookletModel> models = new List<GradingBookletModel>();
            booklets.ForEach(b => models.Add(MapBookletModel(b)));
            return models;
        }

        public static GradingBooklet MapBookletDal(GradingBookletModel model)
        {
            return new GradingBooklet()
            {
                ClubId = model.ClubId,
                Description = model.Description, 
                Id = model.Id,
                IsDeleted = model.IsDeleted,
                IsGlobal = model.IsGlobal,
                Name = model.Name
            };
        }
    }
}