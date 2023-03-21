import { useEffect, useState } from 'react'

// ? Hook criado para evitar a re-renderização de componentes a cada tecla digitada adicionando um delay antes de fazer a alteração no codigo

const useDebounce = ( value: any, delay: number ) => {
  const [debounceValue, setDebounceValue] = useState( value )

  useEffect( () => {
    const handler = setTimeout( () => {
      setDebounceValue( value )
    }, delay )

    return () => {
      clearTimeout( handler )
    }
  }, [value, delay] )

  return debounceValue
}

export default useDebounce
