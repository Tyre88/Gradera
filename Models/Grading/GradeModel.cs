using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Gradera.Grading.DAL;
using Gradera.Techniques.BLL;
using Gradera.Grading.BLL;
using System.Threading.Tasks;
using System.Collections.Concurrent;
using Gradera.Core.Helpers;

namespace Gradera_Klubb.Models.Grading
{
    public class GradeModel
    {
        public int Id { get; set; }
        public int ClubId { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public int GradingBookletId { get; set; }
        public List<GradeCategoryLinkModel> GradeCategoryLinks { get; set; }

        public GradeModel()
        {
            GradeCategoryLinks = new List<GradeCategoryLinkModel>();
        }

        public static List<GradeModel> MapGradeModels(List<Gradera.Grading.DAL.Grade> grades, bool deepLoad = false)
        {
            ConcurrentBag<GradeModel> models = new ConcurrentBag<GradeModel>();
            Parallel.ForEach(grades, g =>
            {
                models.Add(MapGradeModel(g, deepLoad));
            });
            return models.OrderBy(m => m.Id).ToList();
        }

        public static GradeModel MapGradeModel(Grade grade, bool deepLoad = false)
        {
            GradeModel model = new GradeModel()
            {
                ClubId = grade.ClubId,
                Id = grade.Id,
                Image = grade.Image,
                Name = grade.Name,
                GradingBookletId = grade.GradingBookletId
            };

            if(deepLoad && grade.Grade_Category_Link.Count > 0)
            {
                try
                {
                    foreach (var link in grade.Grade_Category_Link)
                    {
                        GradeCategoryLinkModel linkModel = new GradeCategoryLinkModel()
                        {
                            GradeCategoryId = link.GradeCategoryId,
                            GradeId = link.GradeId,
                            Id = link.Id,
                            Text = link.Text
                        };

                        if (grade.Grade_Category_Link_Technique.Count > 0)
                        {
                            foreach (var technique in grade.Grade_Category_Link_Technique)
                            {
                                if (technique.GradeCategoryLinkId == linkModel.Id)
                                {
                                    GradeCategoryLinkTechniqueModel gm = new GradeCategoryLinkTechniqueModel()
                                    {
                                        GradeCategoryLinkId = technique.GradeCategoryLinkId,
                                        GradeId = technique.GradeId,
                                        Id = technique.Id,
                                        TechniqueId = technique.TechniqueId
                                    };

                                    Gradera.Techniques.DAL.Technique tec = TechniqueAdminBLL.GetTechnique(technique.TechniqueId, grade.ClubId);

                                    gm.Name = tec.Name;

                                    foreach (var image in tec.Technique_Image)
                                    {
                                        gm.TechniqueImages.Add(new Techniques.TechniqueImageModel()
                                        {
                                            Id = image.Id,
                                            Image = image.Image,
                                            TechniqueId = image.TechniqueId,
                                            ImageOrder = image.ImageOrder
                                        });
                                    }


                                    linkModel.GradeCategoryLinkTechniques.Add(gm);
                                }
                            }
                        }

                        linkModel.CategoryName = GradingBLL.GetGradingCategory(link.GradeCategoryId, model.ClubId).Name;

                        model.GradeCategoryLinks.Add(linkModel);
                    }
                }
                catch (Exception ex)
                {
                    LogHelper.LogError(string.Format("Error deeploading GradeModel"), ex, grade.ClubId);
                }
            }

            return model;
        }

        public static Grade MapGradeDal(GradeModel model)
        {
            Grade grade = new Grade()
            {
                ClubId = model.ClubId,
                Id = model.Id,
                Image = model.Image,
                Name = model.Name,
                GradingBookletId = model.GradingBookletId
            };

            model.GradeCategoryLinks.ForEach(g => MapCategoryLink(g, grade));

            return grade;
        }

        private static void MapCategoryLink(GradeCategoryLinkModel g, Grade grade)
        {
            Grade_Category_Link link = new Grade_Category_Link()
            {
                GradeCategoryId = g.GradeCategoryId,
                GradeId = g.GradeId,
                Id = g.Id,
                Text = g.Text
            };

            g.GradeCategoryLinkTechniques.ForEach(t => link.Grade_Category_Link_Technique.Add(new Grade_Category_Link_Technique()
            {
                GradeCategoryLinkId = link.Id,
                GradeId = grade.Id,
                Id = t.Id,
                TechniqueId = t.TechniqueId
            }));

            g.GradeCategoryLinkTechniques = g.GradeCategoryLinkTechniques.DistinctBy(t => t.TechniqueId).ToList();

            grade.Grade_Category_Link.Add(link);
        }
    }
}