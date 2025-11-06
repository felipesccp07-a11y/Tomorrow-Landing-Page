import React, { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
// Não precisamos mais do FormInput, pois usaremos inputs padrão
// import FormInput from '../ui/FormInput'; 

const ContactSection = () => {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [resumo, setResumo] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  const handleWhatsAppChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 10);

    if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,4})$/, '($1) $2');
    } else if (value.length > 0) {
      value = value.replace(/^(\d{0,2})$/, '($1');
    }

    setWhatsapp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const scriptURL = 'https://script.google.com/macros/s/AKfycbyxL1sSlkDzsaN13eLu_CwkKlmCpT_XX7osGa1poYvZU3ACIq-LS0nePkzXTkZgtP8Z/exec';

    const formData = new FormData();
    formData.append('Nome', nome);
    formData.append('WhatsApp', whatsapp);
    formData.append('Email', email);
    formData.append('Resumo', resumo);

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (result.result === 'success') {
        setSubmitStatus('success');
        setNome('');
        setWhatsapp('');
        setEmail('');
        setResumo('');
      } else {
        throw new Error(result.message || 'Erro desconhecido no script');
      }

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  return (
    <section id="contato" className="bg-gray-900 py-24 md:py-32">
      <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-16 px-4 lg:grid-cols-2">

        <div>
          <SectionTitle title="Vamos conversar" />
          <p className="mt-6 text-lg text-gray-400">
            Consulta gratuita de 15 minutos. Sem promessa milagrosa. Se fizer
            sentido, seguimos. Se não, você sai com clareza e 3 ações práticas.
          </p>
          <ul className="mt-8 space-y-4 text-gray-400">
            <li className="flex items-center">
              <strong className="mr-2 text-white">E-mail:</strong>
              felipe@agenciatomorrow.com
            </li>
            <li className="flex items-center">
              <strong className="mr-2 text-white">WhatsApp:</strong>
              (35) 98446-8504
            </li>
            <li className="flex items-center">
              <strong className="mr-2 text-white">Horário:</strong>
              Seg. a Sex. • 08h às 18h
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <Card className="p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              
              <div className="sm:col-span-1">
                <label htmlFor="nome" className="mb-2 block text-sm font-semibold text-white">
                  Nome <span className="text-orange-600">*</span>
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 shadow-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="whatsapp" className="mb-2 block text-sm font-semibold text-white">
                  WhatsApp <span className="text-orange-600">*</span>
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={handleWhatsAppChange}
                  placeholder="(XX) XXXX-XXXX"
                  maxLength="14"
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 shadow-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-white">
                  E-mail <span className="text-orange-600">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                	required
                	value={email}
                	onChange={(e) => setEmail(e.target.value)}
                	className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 shadow-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600"
            	  />
          	  </div>

          	  <div className="sm:col-span-2">
            	  <label
              	  htmlFor="resumo"
              	  className="mb-2 block text-sm font-semibold text-white"
            	  >
              	  Resumo do contato (Opcional)
            	  </label>
            	  <textarea
              	  id="resumo"
              	  name="resumo"
              	  rows="4"
              	  className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 shadow-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600"
              	  value={resumo}
              	  onChange={(e) => setResumo(e.target.value)}
            	  ></textarea>
          	  </div>
        	  </div>

        	  {submitStatus === 'success' && (
          	  <div className="mt-6 rounded-md bg-green-600 p-3 text-center text-white font-bold">
            	  ✅ Mensagem enviada com sucesso!
          	  </div>
        	  )}
        	  {submitStatus === 'error' && (
      	  <div className="mt-6 rounded-md bg-red-600 p-3 text-center text-white font-bold">
            	  ⚠️ Ops! Algo deu errado. Por favor, entre em contato direto pelo WhatsApp.
          	  </div>
        	  )}

        	  <button
          	  type="submit"
          	  className="mt-8 w-full rounded-md bg-orange-600 px-6 py-3 text-base font-bold text-gray-900 transition-all duration-300 hover:bg-orange-500 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          	  disabled={isSubmitting}
        	  >
          	  {isSubmitting ? 'Enviando...' : 'Quero a Consulta Gratuita'}
        	  </button>
        	</Card>
      	  </form>
    	</div>
  	</section>
  );
};

export default ContactSection;