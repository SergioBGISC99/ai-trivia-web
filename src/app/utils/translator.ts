export const translate = async (lang: string, text: string) => {
  const traslation = await Translator.create({
    sourceLanguage: 'es',
    targetLanguage: lang,
  });

  const t = await traslation.translate(text);

  return t;
};
