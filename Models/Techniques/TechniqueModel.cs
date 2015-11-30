using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gradera_Klubb.Models.Techniques
{
    public class TechniqueModel
    {
        public int TechniqueId { get; set; }
        public int ClubId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TechniqueTypeId { get; set; }
        public bool IsGlobal { get; set; }

        public static TechniqueModel MapTechniqueModel(Gradera.Techniques.DAL.Technique tec)
        {
            return new TechniqueModel()
            {
                ClubId = tec.ClubId,
                Description = tec.Description,
                TechniqueId = tec.Id,
                IsGlobal = tec.IsGlobal,
                Name = tec.Name,
                TechniqueTypeId = tec.TechniqueTypeId
            };
        }

        public static List<TechniqueModel> MapTechniqueModels(List<Gradera.Techniques.DAL.Technique> techs)
        {
            List<TechniqueModel> models = new List<TechniqueModel>();
            techs.ForEach(t => models.Add(MapTechniqueModel(t)));
            return models;
        }

        public static Gradera.Techniques.DAL.Technique MapTechniqueToData(TechniqueModel model)
        {
            return new Gradera.Techniques.DAL.Technique()
            {
                ClubId = model.ClubId,
                Description = model.Description,
                Id = model.TechniqueId,
                IsGlobal = model.IsGlobal,
                Name = model.Name,
                TechniqueTypeId = model.TechniqueTypeId
            };
        }
    }
}