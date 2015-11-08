using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gradera_Klubb.Models.Competition.External
{
    public class CompetitionExternalCompeditorModel
    {
        public int Birthyear { get; set; }
        public int Category { get; set; }
        public string FirstName { get; set; }
        public int Gender { get; set; }
        public Gradera.Core.Enums.Grade Grade { get; set; }
        public string LastName { get; set; }
        public string Weight { get; set; }
    }
}