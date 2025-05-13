import React from 'react'
import Audio from "../Assets/audio.png";
import Image from "../Assets/image.png";
import Code from "../Assets/code.png";




const Work = () => {
// Gallery text cards inforamtion about audio, image, code
    const workInfonew=[

        {
                    
            title:"Audio",
            text:"Speech Patterns: AI-generated audio often has perfect pitch, timing, or inflection, which may feel unnatural.",
            text2:"Artifacts: Background noise or subtle distortions typical of human recordings might be absent.",
            text3:"Waveform Analysis: Tools can analyze waveforms for signs of synthetic generation."
        },
        {
            
            title:"Image",
            text:"Pixel Analysis: AI-generated images can have irregularities in textures, symmetry, or details (e.g., distorted hands or inconsistent reflections).",
            text2:"Metadata Review: Some AI tools embed metadata identifying the use of AI.",
            text3:"Pattern Detection: Algorithms can spot signs of GAN-based generation, such as overly smooth areas or artifacts in details."
        },
        {
            
            title:"Code",
            text:"Style Consistency: AI-generated code often has a uniform style, with overly clear comments or perfect formatting.",
            text2:"Structure Analysis: Code may lack idiosyncrasies typical of human developers, such as creative problem-solving or unconventional solutions.",
            text3:"Testing Against Known Models: Systems can match code patterns with outputs from popular AI tools like ChatGPT or Copilot."
        },
    ]

    // click to analyis cards 
    const workInfo=[

        {
            image:Audio,
            title:"Audio",
            text:"Click To Start Audio Analysis"

        },
        {
            image: Image,
            title:"Image",
            text:"Click To Start Image Analysis"
  
        },
        {
            image: Code,
            title:"Code",
            text:"Click To Start Code Analysis"

        }
    ]
  return (
    <div className='work-section-wrapper'>
        <div className='work-section-top'>
            <p className='primary-subheading'> Work</p>
            <p className='primary-subheading'>How it works</p> 
        </div>

        <div className="work-section-bottom-new">
            {workInfonew.map((data) => (
                <div className="work-section-info-new" key={data.title}>

                    <h2>{data.title}</h2>
                    <p>{data.text}</p>
                    <p>{data.text2}</p>
                    <p>{data.text3}</p>
                </div>
            ))}
        </div>


        <div className="work-section-bottom">
            {workInfo.map((data) => (
                <div className="work-section-info" key={data.title}>
                    <div className="info-boxes-img-container">
                        <img src={data.image} alt="" />
                    </div>
                    <h2>{data.title}</h2>
                    <p>{data.text}</p>
                </div>
            ))}
        </div>




    </div>
  );
};

export default Work;
