import React, { useState, useContext } from 'react';
import Moment from 'moment';
import { Toast } from '../../utils/Toast';
import { Context } from '../../utils/Context';
import { blob } from '../../utils/Fetch';
import Loading from '../Layouts/Loading';

const Reporte = () => {
    const { checkConfig } = useContext(Context);
    const [lapso, setLapso] = useState(checkConfig().Lapso);
    const [btnEstablecer, setBtnEstablecer] = useState(checkConfig().Lapso ? false : true);
    const [loading, setLoading] = useState(false);

    const getReporte = async (ev) => {
        ev.preventDefault(); setBtnEstablecer(true); setLoading(true);
        await blob(`reporte/get?lapso=${lapso}`).then((items) => {
            items !== undefined ? items.blob().then(blob => downloadFile(blob)) : Toast({ show: true, title: 'Advertencia!', msj: `Por alguna razon el Reporte de deudas no ha sido creado!`, color: 'yellow' }); 
            items !== undefined ? Toast({ show: true, title: 'Información!', msj: `Reporte de deudas ha sido creado!`, color: 'yellow' }) : Toast({ show: false });
        });
        setBtnEstablecer(false); setLoading(false);
    }

    const downloadFile = async (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        a.download = `Reporte Cuentas ${Moment(new Date()).format('DD-MM-YYYY')}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    return (
        <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
        {loading ? <Loading display={'block'} msj={'Creando reporte! espera un momento...'} /> : ''}
        <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Reporte de cuentas</h2>
            </div>
        </div>
        <div className="max-w-7xl mx-auto py-6">
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden ">
                            <div className="mt-10 sm:mt-0">
                                <div className="md:grid md:grid-cols-3 md:gap-6">
                                    <div className="md:col-span-1">
                                        <div className="px-4 sm:px-0">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">Reporte de cuentas por cobrar</h3>
                                            <p className="mt-1 text-sm text-gray-600">Generación de reporte de cuentas por cobrar de estudiantes por lapso / cuotas</p>
                                        </div>
                                    </div>
                                    <div className="mt-5 md:mt-0 md:col-span-2">
                                        <form onSubmit={async (ev) => getReporte(ev)}>
                                            <div className="shadow overflow-hidden sm:rounded-md">
                                                <div className="px-4 py-5 bg-white sm:p-6">
                                                    <div className="grid grid-cols-8 gap-6">
                                                        <div className="col-span-10 sm:col-span-3">
                                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                                Lapso
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="lapso"
                                                                id="lapso"
                                                                readOnly="true"
                                                                value={checkConfig().Lapso !== null ? checkConfig().Lapso : lapso}
                                                                onChange={async (event) => setLapso(event.target.value)}
                                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            />
                                                        </div>
                                                        <div className="col-span-8">
                                                            <button
                                                                type="submit"
                                                                disabled={btnEstablecer}
                                                                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${btnEstablecer ? 'bg-indigo-200 hover:bg-indigo-200' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                                            >
                                                                Crear reporte
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Reporte;
