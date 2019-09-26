using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace an34e_project.Models
{
    public class Customer : BaseClass
    {
        public string Name { get; set; }
        public string Responsible { get; set; }
        public DateTime CustomerSince { get; set; }

        internal bool Save()
        {
            var strDb = ConfigurationManager.ConnectionStrings["db"].ConnectionString.ToString();
            var conn = new SqlConnection(strDb);
            var cmd = new SqlCommand();

            if (this.Id == 0) //insert
            {
                conn.Open();
                cmd = new SqlCommand("insert into customers (name, responsible, customer_since) values (@name, @responsible, @customer_since)", conn);
                cmd.Parameters.Add(new SqlParameter("@name", Name) { DbType = DbType.String });
                cmd.Parameters.Add(new SqlParameter("@responsible", Responsible) { DbType = DbType.String });
                cmd.Parameters.Add(new SqlParameter("@customer_since", CustomerSince) { DbType = DbType.DateTime });
            }
            else //update
            {
                conn.Open();
                cmd = new SqlCommand("update customers set name = @name, responsible = @responsible, customer_since = @customer_since, removed = @removed where id = @id", conn);
                cmd.Parameters.Add(new SqlParameter("@id", Id) { DbType = DbType.Int32 });
                cmd.Parameters.Add(new SqlParameter("@name", Name) { DbType = DbType.String });
                cmd.Parameters.Add(new SqlParameter("@responsible", Responsible) { DbType = DbType.String });
                cmd.Parameters.Add(new SqlParameter("@customer_since", CustomerSince) { DbType = DbType.DateTime });
                cmd.Parameters.Add(new SqlParameter("@removed", Removed) { DbType = DbType.Int32 });

            }

            var rows = cmd.ExecuteNonQuery();
            conn.Close();
            return (rows > 0);
        }
        public List<Customer> ListCustomer() 
        {
            var Db = ConfigurationManager.ConnectionStrings["db"].ConnectionString.ToString();
            var connection = new SqlConnection(Db);
            connection.Open();

            var cmd = new SqlCommand("select t.id, t.name, t.responsible, t.customer_since, t.removed from customers t where t.removed = 0", connection);

            SqlDataReader dt = cmd.ExecuteReader();
            var lst = new List<Customer>();
            if (dt.HasRows)
                while (dt.Read()) {
                    var obj = new Customer();
                    obj.Id = dt.GetInt32(0);
                    obj.Name = dt.GetString(1);
                    obj.Responsible = dt.GetString(2);
                    obj.CustomerSince = dt.GetDateTime(3);

                    lst.Add(obj);
                }
            connection.Close();
            return lst;
        }

        public static Customer SelectById(int id)
        {

            var Db = ConfigurationManager.ConnectionStrings["db"].ConnectionString.ToString();
            var connection = new SqlConnection(Db);
            connection.Open();

            var cmd = new SqlCommand("select * from customers where id = @id", connection);
            cmd.Parameters.Add(new SqlParameter("@id", id) { DbType = DbType.Int32 });

            SqlDataReader dt = cmd.ExecuteReader();
            dt.Read();
            var obj = new Customer();
            obj.Id = dt.GetInt32(0);
            obj.Name = dt.GetString(1);
            obj.Responsible= dt.GetString(2);
            obj.CustomerSince = dt.GetDateTime(3);
            connection.Close();
            return obj;
        }

    }

}