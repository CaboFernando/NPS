using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace an34e_project.Controllers
{
    public class UsersController : BaseController
    {
        public ActionResult Login(FormCollection formData)
        {
            var senha = formData["password"].ToString();
            var login = formData["email"].ToString();

            Session["User"] = login;

            //var senhaCriptografada = Models.User.getHashSha256(senha);

            var l = Models.User.Logar(login, senha);

            if (l == true)
            {
                return Redirect("/Home/Index");
            }
            else
            {
                return Redirect("/Home/Login");
            }
        }

        public ActionResult Logoff()
        {
            Session.Clear();
            FormsAuthentication.SignOut();
            return Redirect("/Home/Index");
        }
    }
}