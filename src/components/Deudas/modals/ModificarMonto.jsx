import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';

const ModificarMonto = ({ openC, confirm, montoNuevo, cuota, arancel }) => {
    const [open, setOpen] = useState(true);
    const [checkMonto, setCheckMonto] = useState(false);
    const [montoTemp, setMontoTemp] = useState('');
    const cancelButtonRef = useRef(null);

    const activeModificacion = (open) => {
        openC(open); setOpen(open);
    }

    const okModificar = async () => { 
        confirm(checkMonto ? cuota : montoTemp); 
        if(checkMonto || montoTemp !== ''){
            setOpen(open);
        } 
    }
    const changeMonto = async (value) => {
        if(typeof(value) === 'boolean'){
            setCheckMonto(value); montoNuevo(value ? cuota : ''); setMontoTemp(checkMonto ? cuota : '');
        }else if(typeof(value) === 'string'){
            montoNuevo(value !== '' ? value : cuota); setMontoTemp(value !== '' ? value : cuota);
        }
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                open={open}
                onClose={() => activeModificacion(false)}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Modificar deuda <span style={{color:'red'}}>{arancel}</span>
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <form className="mt-8 space-y-6">

                                                <fieldset>
                                                    <legend className="text-base font-medium text-gray-900">Establecer monto configurado</legend>
                                                    <div className="mt-4 space-y-4">
                                                        <div className="flex items-start">
                                                            <div className="flex items-center h-5">
                                                                <input
                                                                    id="comments"
                                                                    name="comments"
                                                                    type="checkbox"
                                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                                    value={checkMonto}
                                                                    onChange={async (ev) => changeMonto(ev.target.checked)}
                                                                />
                                                            </div>
                                                            <div className="ml-3 text-sm">
                                                                <label htmlFor="comments" className="font-medium text-gray-700">
                                                                    {cuota}
                                                                </label>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </fieldset>

                                                <div className="rounded-md shadow-sm -space-y-px">
                                                    <fieldset>
                                                        <legend className="text-base font-medium text-gray-900">Establecer monto manual</legend>
                                                        <label for="monto" className="sr-only">Monto nuevo</label>
                                                        <input id="monto" disabled={checkMonto} defaultValue={checkMonto ? cuota : montoTemp} name="monto" onChange={async (ev) => changeMonto(ev.target.value)} type="text" required className="appearance-none rounded-none relative block w-full px-6 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder={`Monto nuevo ${checkMonto ? cuota : 'xxxxx.xx'}`} />
                                                    </fieldset>

                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    disabled={false}
                                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 hover:bg-green-700 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm`}
                                    onClick={() => okModificar(true)}
                                >
                                    Guardar
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => activeModificacion(false, false)}
                                    ref={cancelButtonRef}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModificarMonto;

