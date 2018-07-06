using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WorkoutApp.Domain;
using WorkoutApp.Infrastructure;

namespace WorkoutApp.Web.Controllers
{
    [Route("api/[controller]")]
    public class ProgramVersionController : Controller
    {
        private IProgramVersionRepo ProgramVersionRepo;
        public ProgramVersionController(IProgramVersionRepo ProgramVersionRepo)
        {
            this.ProgramVersionRepo = ProgramVersionRepo;
        }

        [HttpGet("GetProgramVersionExcercises/{Program_Version_Id}")]
        public ActionResult<IEnumerable<Excercise>> GetProgramVersionExcercises( [FromRoute] int Program_Version_Id )
        {
            //will get an implicit conversion error if I don't use the contructor of ActionResult.
            var excercises = new ActionResult<IEnumerable<Excercise>>( ProgramVersionRepo.GetProgramVersionExcercises(Program_Version_Id) );

            if (excercises == null)
            {
                return NotFound();
            }

            return excercises;
        }
    }
}
