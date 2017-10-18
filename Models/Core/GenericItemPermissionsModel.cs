using Gradera.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gradera_Klubb.Models.Core
{
    public class GenericItemPermissionsModel
    {
        public int ObjectId { get; set; }
        public GenericItemPermissionObjectTypes ObjectType { get; set; }
        public List<int> AccessrightIds { get; set; }
        public List<int> UserIds { get; set; }
    }
}