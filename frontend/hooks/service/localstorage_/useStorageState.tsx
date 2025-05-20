import { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Para manter a sessão mesmo se o app for reiniciado, usamos armazenamento seguro (ou localStorage no web).

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];


// Reducer para para armazenar um estado que representa isLoading: Se o estado ainda está sendo carregado, o valor armazenado ou sessão


function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}


// responsável por salvar ou remover itens do armazenamento
export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}


// Hook que une a recuperação e o armazenamento do valor (neste caso, a sessão)
export function useStorageState(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>();

  // Recupera o valor armazenado quando o componente é montado.
  useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          setState(localStorage.getItem(key));
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      SecureStore.getItemAsync(key).then(value => {
        setState(value);
      });
    }
  }, [key, setState]);

  // Função para atualizar o valor no estado e no armazenamento.
  const setValue = useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key, setState]
  );

  return [state, setValue];
}