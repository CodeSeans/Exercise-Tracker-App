const workoutForm = document.getElementById('workout-form')
const exerciseNameInput = document.getElementById('exercise-name')
const setsInput = document.getElementById('sets')
const repsInput = document.getElementById('reps')
const weightInput = document.getElementById('weight')
const dateInput = document.getElementById('date')
const exerciseTypeInput = document.getElementById('exercise-type')
const workoutList = document.getElementById('workout-list')


const STORAGE_KEY = 'workouts';


workoutForm.addEventListener('submit', function(event){
    event.preventDefault();
    
    const workout = {
        id: new Date().toISOString(),
        name: exerciseNameInput.value,
        sets: setsInput.value,
        reps: repsInput.value,
        weight: weightInput.value,
        date: dateInput.value,
        type: exerciseTypeInput.value
      };
 
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${workout.name}</strong> - ${workout.date}<br>
        Type: ${workout.type}<br>
        Set: ${workout.sets}, Reps: ${workout.reps}, Weight: ${workout.weight} kg
         <br><button class="delete-btn">Delete</button>
      `;

    workoutList.appendChild(li);

    saveWorkout(workout);

    deleteWorkout(workout);

   workoutForm.reset();  

});


function saveWorkout(workout){

  const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
  workouts.push(workout);
  localStorage.setItem('workouts', JSON.stringify(workouts));

}

function loadWorkouts(){

const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
workoutList.innerHTML = '';

workouts.forEach(workout =>{
  const li = document.createElement('li');
  li.innerHTML = `
     <strong> ${workout.name} </strong> - ${workout.date} <br>
     
     Type : ${workout.type} <br>
     
     Set : ${workout.sets}, Reps: ${workout.reps}, Weight: ${workout.weight} kg <br>
         <br><button class="delete-btn">Delete</button>
     <br>
  `;

  li.querySelector('.delete-btn').addEventListener('click', () => {
    deleteWorkout(workout.id);
  });

  workoutList.appendChild(li)
});

}

function deleteWorkout(id) {
  let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
  workouts = workouts.filter(workout => workout.id !== id);
  localStorage.setItem('workouts', JSON.stringify(workouts));
  loadWorkouts(); 
}



window.addEventListener('DOMContentLoaded', loadWorkouts);
