using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface IPalestrantePersist
    {
        //PALESTRANTES
        Task<Palestrante[]> GelAllPalestrantesByNomeAsync(string nome, bool includeEventos);
        Task<Palestrante[]> GelAllPalestrantesAsync(bool includeEventos);
        Task<Palestrante> GelAllPalestranteByIdAsync(int palestranteId, bool includeEventos);

    }
}