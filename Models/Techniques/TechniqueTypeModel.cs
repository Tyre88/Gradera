using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Gradera.Techniques.DAL;

namespace Gradera_Klubb.Models.Techniques
{
    public class TechniqueTypeModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsGlobal { get; set; }
        public int ClubId { get; set; }

        internal static Technique_Type MapTechniqueTypeToDAL(TechniqueTypeModel techniqueType)
        {
            return new Technique_Type()
            {
                Name = techniqueType.Name,
                IsGlobal = techniqueType.IsGlobal,
                ClubId = techniqueType.ClubId,
                Id = techniqueType.Id
            };
        }

        internal static TechniqueTypeModel MapTechniqueType(Technique_Type type)
        {
            return new TechniqueTypeModel()
            {
                ClubId = type.ClubId,
                Id = type.Id,
                IsGlobal = type.IsGlobal,
                Name = type.Name
            };
        }

        internal static List<TechniqueTypeModel> MapTechniqueTypes(List<Technique_Type> types)
        {
            List<TechniqueTypeModel> models = new List<TechniqueTypeModel>();
            types.ForEach(t => models.Add(MapTechniqueType(t)));
            return models;
        }
    }
}