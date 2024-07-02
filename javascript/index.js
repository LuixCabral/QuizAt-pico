(function() {
    var contador = 0;
  
    const buttons = document.querySelectorAll('.respostas input');
    const correctAnswers = [4, 8, 10, 13];
  
    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const id = parseInt(button.id);
        if (correctAnswers.includes(id)) {
          contador++;
          console.log(true);
        } else {
          console.log(false);
        }
      });
    });
  
    const finalizar = document.getElementById('Finalizar');
    if (finalizar) {
      finalizar.addEventListener("click", function() {
        alert("Acertos: " + contador);
      });
    } else {
      console.error("Button with ID 'Finalizar' not found");
    }
})();