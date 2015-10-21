using Core.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gradera_Klubb.Models
{
    public class AccessrightModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public static List<AccessrightModel> MapAccessrights(List<Accessright> accessrights)
        {
            List<AccessrightModel> accessrightModels = new List<AccessrightModel>();
            accessrights.ForEach(a => accessrightModels.Add(MapAccessright(a)));
            return accessrightModels;
        }

        public static AccessrightModel MapAccessright(Accessright accessright)
        {
            return new AccessrightModel()
            {
                Id = accessright.ID,
                Description = accessright.Description,
                Name = accessright.Name
            };
        }
    }
}