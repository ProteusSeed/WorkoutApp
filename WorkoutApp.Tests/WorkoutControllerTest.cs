using System;
using Xunit;
using Moq;
using Microsoft.AspNetCore.Mvc;
using WorkoutApp.Domain.Interfaces;
using WorkoutApp.Web.Controllers;
using WorkoutApp.Domain;
using System.Collections.Generic;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.ModelBinding; //to access model state

namespace WorkoutApp.Tests
{
    public class WorkoutControllerTest
    {
        private Mock<IWorkoutExcerciseRepo> WorkoutExcerciseRepoMock;
        private WorkoutController WorkoutController;

        public WorkoutControllerTest()
        {
            WorkoutExcerciseRepoMock = new Mock<IWorkoutExcerciseRepo>();
            WorkoutController = new WorkoutController(WorkoutExcerciseRepoMock.Object);
        }

        [Fact]
        public void CreateWorkoutExcercise_ShouldReturnWorkoutExcercises()
        {
            //Arrange
            Workout_Excercise WorkoutExcerciseDataMock = new Workout_Excercise
                {
                Workout_DateTime = DateTime.Now,
                Program_Version_Id = 1,
                Excercise_Id = 1,
                Weight = 100,
                Set_Number = 10000,
                Rep_Number = 5,
                Workout_Excercise_Note = "Controller Unit Test",
                Workout_Excercise_DateTime = DateTime.Now
                };

            //WorkoutExcerciseRepoMock.Setup(repo => repo.CreateWorkout()).Returns(Task.Void);

            //act

            var result = WorkoutController.CreateWorkoutExcercise(WorkoutExcerciseDataMock);

            //asert
            var IsOfTypeWorkoutExcercise = Assert.IsType<ActionResult<Workout_Excercise>>(result);
            result.Should().NotBeNull();
            var okResult = result.Should().BeOfType<ActionResult<Workout_Excercise>>().Subject;//fluent assertion version
            var WorkoutExcercise = okResult.Value.Should().BeAssignableTo<Workout_Excercise>().Subject;         

            WorkoutExcercise.Program_Version_Id.Should().Be(1);
        }
    }
}
