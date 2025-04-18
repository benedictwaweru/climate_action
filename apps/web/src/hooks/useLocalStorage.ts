// ---------------------------------------------------------------------------------
// Copyright 2025 Benedict Waweru
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ---------------------------------------------------------------------------------

import { useCallback, useEffect, useState } from "react";

/**
 *
 * @param key
 * @param initialValue
 * @returns
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
	/**
	 *
	 */
	const getStoredValue = useCallback((): T => {
		if (typeof window === "undefined") {
			return initialValue;
		}

		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(`Error reading localStorage key "${key}":`, error);
			return initialValue;
		}
	}, [key, initialValue]);

	const [storedValue, setStoredValue] = useState<T>(getStoredValue);

	/**
	 *
	 */
	useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === key) {
				setStoredValue(getStoredValue());
			}
		};

		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, [key, getStoredValue]);

	const setValue = useCallback(
		(value: T | ((val: T) => T)) => {
			try {
				const valueToStore =
					value instanceof Function ? value(storedValue) : value;
				setStoredValue(valueToStore);

				if (typeof window !== "undefined") {
					localStorage.setItem(key, JSON.stringify(valueToStore));
				}
			} catch (error) {
				console.error(`Error setting localStorage key "${key}":`, error);
			}
		},
		[key, storedValue],
	);

	return [storedValue, setValue] as const;
};
