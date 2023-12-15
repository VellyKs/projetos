document.addEventListener('DOMContentLoaded', () => {
    readReceitas();
  });

  const readReceitas = async () => {
    try {
      const response = await fetch('/receitas');
      const data = await response.json();
      clear_li();
      data.forEach(createrow);
      vazio();
    } catch (error) {
      console.error('Erro ao carregar receitas:', error);
    }
  };

  const saveReceita = async (receita) => {
    try {
      const response = await fetch('/receitas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(receita),
      });
      const result = await response.json();
      console.log(result.message);
      update_li();
    } catch (error) {
      console.error('Erro ao salvar receita:', error);
    }
  };