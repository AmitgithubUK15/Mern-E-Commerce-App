import { useState } from "react"


export default function MobileProduct() {
    const [mobiledetail, setMobiledetail] = useState(false);
    const [backCameraQuantity,setBackCamera] = useState(false);
    const [inputmap,setInputMaping] = useState()

    function handleBrand(e) {
        if (e.target.value === "Apple" || e.target.value === "Redmi" || e.target.value === "Samsung" || e.target.value === "Realme"
            || e.target.value === "Moto" || e.target.value === "OnePlus") {
            setMobiledetail(true)
        }
        else {
            setMobiledetail(false);
        }
    }

    function handleCameraQuantity(e){
        let num = parseInt(e.target.value);
      if(num === 1 || num ===2 || num ===3 || num===4){
        let arr = [];
        for(let i =0; i<num; i++){
            arr.push(i);
        }
        setInputMaping(arr);
        setBackCamera(true);
       
    }
      else{
       setBackCamera(false);
      }
    }

    return (
        <div className='flex flex-col gap-3'>
            <label>Select Mobile</label>
            <select onChange={handleBrand}
                className='border p-3 outline-none rounded-lg' name='DeviceName' required>
                <option value="null">Choose</option>
                <option value="Redmi">Redmi</option>
                <option value="Realme">Realme</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Moto">Moto</option>
                <option value="OnePlus">OnePlus</option>
                <option value="OnePlus">Oppo</option>
                <option value="OnePlus">Vivo</option>
                <option value="OnePlus">Poco</option>
            </select>

            {mobiledetail && <div className="flex flex-col gap-3">
                <label>Mobile Name</label>
                <input type="text"
                    name="ModelName"
                    className='border outline-none p-3 rounded-lg'
                    required
                />

                <label>Processor</label>
                <input type="text"
                    name="ProcessorName"
                    className='border outline-none p-3 rounded-lg'
                    required
                />

                <label>Opreating System</label>
                <input type="text" 
                name="OS"
                className='border outline-none p-3 rounded-lg' />

                <label>Battery</label>
                <select id=""
                    className='border p-3 outline-none rounded-lg' name='batterytype'>
                    <option value="null">Select Battery capecity</option>
                    <option value="3000">3000 mah</option>
                    <option value="4000">4000 mah</option>
                    <option value="5000">5000 mah</option>
                    <option value="6000">6000 mah</option>
                </select>           

                <label>RAM</label>
                <div className='flex flex-col gap-3 border p-3 rounded-lg'>
                
                    <label>Enter quantities as per RAM</label>
                    <div className='flex gap-8'>
                        <div className='flex flex-col gap-3'>
                            <div className='flex gap-2 items-center'>
                                <label className="w-full text-sm sm:w-16">6 GB</label>
                                <input type="number" placeholder='Quantity' defaultValue={0} name="RAM_6GB" className='border w-24 sm:w-full outline-none p-3 rounded-lg' required />
                            </div>

                            <div className='flex gap-2 items-center'>
                                <label className="w-full text-sm sm:w-16">8 GB</label>
                                <input type="number" placeholder='Quantity' defaultValue={0} name="RAM_8GB" className='border w-24 sm:w-full outline-none p-3 rounded-lg' required />
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div className='flex gap-2 items-center'>
                                <label className="w-full text-sm sm:w-16">12 GB</label>
                                <input type="number" placeholder='Quantity' defaultValue={0} name="RAM_12GB" className='border w-24 sm:w-full outline-none p-3 rounded-lg' required />
                            </div>
                        </div>
                    </div>
                </div>

                <label>ROM</label>
                <div className='flex flex-col gap-3 border p-3 rounded-lg'>
                
                    <label>Enter quantities as per ROM</label>
                    <div className='flex gap-8'>
                        <div className='flex flex-col gap-3'>
                            <div className='flex gap-2 items-center'>
                                <label className="w-full text-sm sm:w-16">64 GB</label>
                                <input type="number" placeholder='Quantity' defaultValue={0} name="ROM_64" className='border w-24 sm:w-full outline-none p-3 rounded-lg' required />
                            </div>

                            <div className='flex gap-2 items-center'>
                                <label className="w-full text-sm sm:w-16">128 GB</label>
                                <input type="number" placeholder='Quantity' defaultValue={0} name="ROM_128" className='border w-24 sm:w-full outline-none p-3 rounded-lg' required />
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div className='flex gap-2 items-center'>
                                <label className="w-full text-sm sm:w-16">256 GB</label>
                                <input type="number" placeholder='Quantity' defaultValue={0} name="ROM_256" className='border w-24 sm:w-full outline-none p-3 rounded-lg' required />
                            </div>
                            <div className='flex gap-2 items-center'>
                                <label className="w-full text-sm sm:w-16">512 GB</label>
                                <input type="number" placeholder='Quantity' defaultValue={0} name="ROM_512" className='border w-24 sm:w-full outline-none p-3 rounded-lg' required />
                            </div>
                        </div>
                    </div>
                </div>

                <label>Display Size</label>
                <input type="text" name="displaySize"
                className='border outline-none p-3 rounded-lg' />
                <label>Display Type</label>
                <input type="text" name="displayType"
                className='border outline-none p-3 rounded-lg' />

                <label >Camera</label>
                <div className="flex flex-col gap-3 p-3 border rounded-lg">
                <label>BackSide Camera</label>
                <select onChange={handleCameraQuantity}
                className='border p-3 outline-none rounded-lg' name='back_Cameras' required>
                <option value="null">Choose</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
            </select>
            {backCameraQuantity && <div>
                  {inputmap.map((print,index)=>(
                    <div key={index} className="flex flex-col gap-3">
                      <label>Enter {index+1} Camera</label>
                      <input type="text" placeholder="How many Pixel" name={`backSide${index+1}`}
                      className='border outline-none p-3 rounded-lg' />
                    </div>
                  ))}
                </div>}

                <label>Front Camera</label>
                <input type="text" name="frontCamera"
                className='border outline-none p-3 rounded-lg' placeholder="How many Pixel" />
                </div>

                <label>Sim Slot</label>
                <input type="text" name="simSlots" placeholder="How many sim slot"
                className='border outline-none p-3 rounded-lg' />
                

                <label>Warranty</label>
                <input type="text" name="warranty" placeholder="How many year warranty"
                className='border outline-none p-3 rounded-lg' />
          
            </div>}
        </div>
    )
}
