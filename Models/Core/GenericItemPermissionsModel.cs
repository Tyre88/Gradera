using Gradera.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Gradera.Core.DAL;

namespace Gradera_Klubb.Models.Core
{
    public class GenericItemPermissionsModel
    {
        public int ObjectId { get; set; }
        public GenericItemPermissionObjectTypes ObjectType { get; set; }
        public List<int> AccessrightIds { get; set; }
        public List<int> UserIds { get; set; }

        public GenericItemPermissionsModel()
        {
            AccessrightIds = new List<int>();
            UserIds = new List<int>();
        }

        public GenericItemPermissionsModel(IList<GenericItemPermission> list)
            : this()
        {
            if(list != null && list.Count > 0)
            {
                ObjectId = list[0].ObjectId;
                ObjectType = (GenericItemPermissionObjectTypes)list[0].ObjectType;
                foreach (var item in list)
                {
                    if (item.AccessrightId != null)
                    {
                        AccessrightIds.Add((int)item.AccessrightId);
                    }

                    if (item.AccountId != null)
                    {
                        UserIds.Add((int)item.AccountId);
                    }
                }
            }
        }
    }
}