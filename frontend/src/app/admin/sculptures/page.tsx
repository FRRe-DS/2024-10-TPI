"use client"
import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table'
import { CircleData } from '@/components/estadisticos/circle'
import { getEsculturas } from '@/app/Esculturas/action'
import { columns } from './columns'
import { set } from 'date-fns'
import { Escultura } from '@/types'

export default async function page() {
  const [data, setData] = useState<Escultura[]>([]); // Estado para almacenar las esculturas


  async function fetchData() {
      const esculturas = await getEsculturas();
      setData(esculturas.items);
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <DataTable columns={columns} data={data} />
        </div>
        <div className="md:col-span-1">
          <CircleData />
        </div>
      </div>

    </div>
  )
}


