using System.Web;
using System.Web.Mvc;

namespace Gradera_Klubb
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            //filters.Add(new Filters.AuthorizeFilter());
        }
    }
}