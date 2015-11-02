using System.Collections.Generic;

namespace Gradera_Klubb.Models
{
    public class TecModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Belt { get; set; }

        internal static List<TecModel> MapTecModels(List<Gradera.Core.DAL.TECHNICS> tecs)
        {
            List<TecModel> models = new List<TecModel>();
            tecs.ForEach(t => models.Add(MapTecModel(t)));
            return models;
        }

        internal static TecModel MapTecModel(Gradera.Core.DAL.TECHNICS tec)
        {
            return new TecModel()
            {
                Belt = tec.belt,
                Description = tec.desc,
                Id = tec.id,
                Name = tec.name
            };
        }
    }
}