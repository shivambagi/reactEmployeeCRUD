using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using ReactEmployeeWEBAPI.Models;
using System.Web;

namespace ReactEmployeeWEBAPI.Controllers
{
    public class EmployeeController : ApiController
    {
        string strcon = ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString;
        public HttpResponseMessage Get()
        {
            string query = @"select EmployeeId,EmployeeName,Department,Convert(varchar(10),DateOfJoining,120) as DateOfJoining,PhotoFileName from Employee";
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

        public string Post(Employee emp)
        {
            try
            {
                string query = @"insert into Employee values('" + emp.EmployeeName + @"','" + emp.Department + @"','" + emp.DateOfJoining + @"','" + emp.PhotoFileName + @"')";
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
            catch (Exception)
            {
                return "Failed to Add";
            }
        }

        public string Put(Employee emp)
        {
            try
            {
                string query = @"update Employee set EmployeeName = '" + emp.EmployeeName + @"'
                                ,Department = '" + emp.Department + @"'
                                ,DateOfJoining = '" + emp.DateOfJoining + @"'
                                ,PhotoFileName = '" + emp.PhotoFileName + @"'
                                where EmployeeId=" + emp.EmployeeId + @"";
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
                string query = @"delete from Employee where EmployeeId = " + id + @"";
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

        [Route("api/Employee/GetAllDepartmentNames")]
        [HttpGet]
        public HttpResponseMessage GetAllDepartmentNames()
        {
            string query = @"select DepartmentName from Department";
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

        [Route("api/Employee/SaveFile")]
        public string SaveFile()
        {
            try 
            {
                var httpRequest = HttpContext.Current.Request;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = HttpContext.Current.Server.MapPath("~/Photos/" + filename);
                postedFile.SaveAs(physicalPath);

                return filename;
            }
            catch (Exception)
            {
                return "File not saved";
            }
        }
    }
}
