export default {
  command: ['chat'],
  category: 'ai',

  run: async (client, m) => {

    const text = m.text || '';
    const prompt = text.split(' ').slice(1).join(' ').trim();

    if (!prompt) {
      return m.reply('⚠️ Usa: ™chat <pregunta>');
    }

    try {

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer TU_API_KEY`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'Eres un asistente que responde cualquier pregunta de forma clara, directa y corta. Sin textos largos.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.8
        })
      });

      const data = await res.json();

      const answer = data?.choices?.[0]?.message?.content;

      if (!answer) {
        return m.reply('❌ No se pudo generar respuesta.');
      }

      return m.reply(answer.trim());

    } catch (err) {
      console.log(err);
      return m.reply('❌ Error conectando con la IA.');
    }
  }
};
