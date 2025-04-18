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

import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

/**
 * @type {FetchDataOptions} - A generic type (<T>) that describes the options you can pass into the useFetch hook.
 */
export type FetchDataOptions<T> = {
	/**
	 * @property {queryKey} - Unique key for caching & identifying the query
	 */
	queryKey: QueryKey;

	/**
	 * @property {url} - API endpoint you want to call
	 */
	url: string;

	/**
	 * @property {params} - Optional query params (e.g., ?id=123)
	 */
	params?: Record<string, unknown>;

	/**
	 * @property {config} - Optional Axios config (e.g., headers, auth, timeout)
	 */
	config?: AxiosRequestConfig;

	/**
	 * @property {queryOptions} - Extra settings for useQuery (e.g., enabled, staleTime) – but intentionally excludes queryKey and queryFn since this hook provides them
	 */
	queryOptions?: Omit<
		UseQueryOptions<T, AxiosError, T, QueryKey>,
		"queryKey" | "queryFn"
	>;
};

/**
 * 
 * @param
 * @returns {UseQueryResult}
 */
export const useFetch = <T>({ queryKey, url, params = {}, config = {}, queryOptions = {} }: FetchDataOptions<T>) => {
	/**
	 * Does the actual fetching of data
	 * @returns {response.data}
	 */
	const fetchData = async (): Promise<T> => {
		try {
			const response = await axios.get<T>(url, { params, ...config });
			return response.data;
		} catch (error) {
			throw error as AxiosError;
		}
	}

	return useQuery<T, AxiosError>({ queryKey, queryFn: fetchData, ...queryOptions });
};
