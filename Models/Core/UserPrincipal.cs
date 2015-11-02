using Gradera.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;

namespace Gradera_Klubb.Models
{
    public class UserPrincipal : GenericPrincipal
    {
        public AccountSessionEntity AccountSession { get; set; }

        public UserPrincipal(IIdentity identity, string[] roles)
            :base(identity, roles)
        {
            AccountSession = new AccountSessionEntity();
        }
    }
}