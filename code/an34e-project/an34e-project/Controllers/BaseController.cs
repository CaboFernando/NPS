using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace an34e_project.Controllers
{
    public class BaseController : Controller
    {
        protected override void OnAuthorization(AuthorizationContext filterContext)
        {
            var url = Request.RawUrl;
            var lstPages = new List<String>() { "/Home/Login", "/Users/Login" };
            var loginRequired = !lstPages.Any(page => url.StartsWith(page));
            if (loginRequired && Session["User"] == null)
                filterContext.Result = new RedirectResult("/Home/Login");

            base.OnAuthorization(filterContext);
        }
    }
}