using ReactEmployeeWEBAPI.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ReactEmployeeWEBAPI.Controllers
{
    public class DepartmentController : ApiController
    {
        string strcon = ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString;
        public HttpResponseMessage Get()
        {
            string query = @"select DepartmentId,DepartmentName from Department";
            DataTable table = new DataTable();
            using (SqlConnection con = new SqlConnection(strcon))
            {
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter sda = new SqlDataAdapter(cmd);
                cmd.CommandType = CommandType.Text;
                sda.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Department dep)
        {
            try 
            {
                string query = @"insert into Department values('"+dep.DepartmentName+ @"')";
                DataTable table = new DataTable();
                using (SqlConnection con = new SqlConnection(strcon))
                {
                    SqlCommand cmd = new SqlCommand(query, con);
                    SqlDataAdapter sda = new SqlDataAdapter(cmd);
                    cmd.CommandType = CommandType.Text;
                    sda.Fill(table);
                }
                return "Added Successfully";
            }
            catch(Exception)
            {
                return "Failed to Add";
            }
        }

        public string Put(Department dep)
        {
            try
            {
                string query = @"update Department set DepartmentName = '" + dep.DepartmentName + "' where DepartmentId="+dep.DepartmentId+@"";
                DataTable table = new DataTable();
                using (SqlConnection con = new SqlConnection(strcon))
                {
                    SqlCommand cmd = new SqlCommand(query, con);
                    SqlDataAdapter sda = new SqlDataAdapter(cmd);
                    cmd.CommandType = CommandType.Text;
                    sda.Fill(table);
                }
                return "Updated Successfully";
            }
            catch (Exception)
            {
                return "Failed to Update";
            }
        }

        public string Delete(int id)
        {
            try
            {
                string query = @"delete from Department where DepartmentId = " + id + @"";
                DataTable table = new DataTable();
                using (SqlConnection con = new SqlConnection(strcon))
                {
                    SqlCommand cmd = new SqlCommand(query, con);
                    SqlDataAdapter sda = new SqlDataAdapter(cmd);
                    cmd.CommandType = CommandType.Text;
                    sda.Fill(table);
                }
                return "Deleted Successfully";
            }
            catch (Exception)
            {
                return "Failed to Delete";
            }
        }
    }
}
