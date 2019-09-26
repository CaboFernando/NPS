using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace an34e_project.Models
{
    public class User : BaseClass
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }

        //public static String getHashSha256(String text)
        //{
        //    byte[] bytes = Encoding.UTF8.GetBytes(text);
        //    SHA256Managed hashstring = new SHA256Managed();
        //    byte[] hash = hashstring.ComputeHash(bytes);
        //    string hashString = string.Empty;
        //    foreach (byte x in hash)
        //    {
        //        hashString += String.Format("{0:x2}", x);
        //    }
        //    return hashString;
        //}

        public static bool Logar(string loginC, string senhaC)
        {
            var strDb = ConfigurationManager.ConnectionStrings["db"].ConnectionString.ToString();

            var conn = new SqlConnection(strDb);
            conn.Open();

            var cmd = new SqlCommand("select login, password from users", conn);

            SqlDataReader dt = cmd.ExecuteReader();


            while (dt.Read())
            {
                var obj = new User();
                obj.Login = dt.GetString(0);
                obj.Password = dt.GetString(1);

                if ((loginC == obj.Login) && (senhaC == obj.Password))
                {
                    return true;
                }
            }

            conn.Close();
            return false;
        }


    }
}