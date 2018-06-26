using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WorkoutApp.Domain;
using WorkoutApp.Domain.Interfaces;

namespace WorkoutApp.Web.Controllers
{
    [Route("api/[controller]")]
    public class WorkoutController : Controller
    {
        private readonly IWorkoutExcerciseRepo WorkoutExcerciseRepo;
        public WorkoutController(IWorkoutExcerciseRepo WorkoutExcerciseRepo)
        {
            this.WorkoutExcerciseRepo = WorkoutExcerciseRepo;
        }

        [HttpPost("CreateWorkoutExcercise")]///{Set_Number},{Rep_Number},{Workout_Excercise_Note}")]
        public Workout_Excercise CreateWorkoutExcercise([FromBody]Workout_Excercise Data) //(int Program_Version_Id, int Excercise_Id, int Weight, int Set_Number, int Rep_Number, string Workout_Excercise_Note)
        {
            //Workout_Excercise WorkoutExcercise = new Workout_Excercise(){
            //    Workout_DateTime = DateTime.Now,
            //    Program_Version_Id = Program_Version_Id,
            //    Excercise_Id = Excercise_Id,
            //    Weight = Weight,
            //    Set_Number = Set_Number,
            //    Rep_Number = Rep_Number,
            //    Workout_Excercise_Note = "testing"
            //};
         
            WorkoutExcerciseRepo.CreateWorkout(Data);

            return Data;
        }

        [HttpGet("TestGet")]
        public IActionResult TestGet()
        {
            return Ok();
        }
    }
}