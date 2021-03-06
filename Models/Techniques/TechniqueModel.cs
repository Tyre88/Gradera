﻿using System;
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
        public List<TechniqueImageModel> TechniqueImages { get; set; }

        public TechniqueModel()
        {
            TechniqueImages = new List<TechniqueImageModel>();
        }

        public static TechniqueModel MapTechniqueModel(Gradera.Techniques.DAL.Technique tec)
        {
            TechniqueModel model = new TechniqueModel()
            {
                ClubId = tec.ClubId,
                Description = tec.Description,
                TechniqueId = tec.Id,
                IsGlobal = tec.IsGlobal,
                Name = tec.Name,
                TechniqueTypeId = tec.TechniqueTypeId
            };

            foreach (var image in tec.Technique_Image)
            {
                model.TechniqueImages.Add(new TechniqueImageModel()
                {
                    Id = image.Id,
                    ImageOrder = image.ImageOrder,
                    Image = image.Image,
                    TechniqueId = image.TechniqueId
                });
            }

            return model;
        }

        public static List<TechniqueModel> MapTechniqueModels(List<Gradera.Techniques.DAL.Technique> techs)
        {
            List<TechniqueModel> models = new List<TechniqueModel>();
            techs.ForEach(t => models.Add(MapTechniqueModel(t)));
            return models;
        }

        public static Gradera.Techniques.DAL.Technique MapTechniqueToData(TechniqueModel model)
        {
            Gradera.Techniques.DAL.Technique tec = new Gradera.Techniques.DAL.Technique()
            {
                ClubId = model.ClubId,
                Description = model.Description,
                Id = model.TechniqueId,
                IsGlobal = model.IsGlobal,
                Name = model.Name,
                TechniqueTypeId = model.TechniqueTypeId
            };

            model.TechniqueImages.ForEach(t => tec.Technique_Image.Add(new Gradera.Techniques.DAL.Technique_Image()
            {
                Id = t.Id,
                Image = t.Image,
                ImageOrder = t.ImageOrder,
                TechniqueId = t.TechniqueId
            }));

            return tec;
        }
    }
}