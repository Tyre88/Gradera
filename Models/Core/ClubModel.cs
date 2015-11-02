﻿using Gradera.Core.DAL;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gradera_Klubb.Models
{
    public class ClubModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string Image { get; set; }
        public ClubSettingsModel Settings { get; set; }

        public static ClubModel MapClub(Club club)
        {
            ClubModel clubModel = new ClubModel()
            {
                Id = club.Id,
                Image = club.Image,
                Name = club.Name,
                ShortName = club.ShortName,
                Settings = JsonConvert.DeserializeObject<ClubSettingsModel>(club.Settings)
            };

            return clubModel;
        }

        public static Club MapClubModelToClub(ClubModel model)
        {
            return new Club()
            {
                Id = model.Id,
                Name = model.Name,
                ShortName = model.ShortName,
                Image = model.Image,
                Settings = JsonConvert.SerializeObject(model.Settings)
            };
        }
    }
}