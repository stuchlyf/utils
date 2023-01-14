"use client";
import { Inter } from '@next/font/google'
import {Input} from "@/components/input/input";
import {Form} from "@/components/form/form";
import {Label} from "@/components/label/label";
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction, useEffect, useMemo,
  useState
} from "react";
import {InputGroup} from "@/components/inputGroup/inputGroup";

const inter = Inter({subsets: ['latin']});
type StateSetterType<T> = Dispatch<SetStateAction<T>>
type Unit = {
  label: string,
  type: 'absolute' | 'relative',
  abbreviation: string,
  value: number | ''
  setter: StateSetterType<number | ''>
  multiplier: number
  placeholder: string
}

export default () => {
  const [ppi, setPpi] = useState<number>(96);
  const [rootFontSize, setRootFontSize] = useState<number>(16);

  const [pxValue, setPxValue] = useState<number | ''>('');
  const [remValue, setRemValue] = useState<number | ''>('');
  const [emValue, setEmValue] = useState<number | ''>('');
  const [tailwindValue, setTailwindValue] = useState<number | ''>('');
  const [ptValue, setPtValue] = useState<number | ''>('');
  const [pcValue, setPcValue] = useState<number | ''>('');
  const [mmValue, setMmValue] = useState<number | ''>('');
  const [cmValue, setCmValue] = useState<number | ''>('');
  const [inValue, setInValue] = useState<number | ''>('');

  const units: Record<string, Unit> = {
    'EM': {
      abbreviation: 'em',
      type: 'relative',
      value: emValue,
      setter: setEmValue,
      multiplier: 0.0625,
      label: 'em (em quadrat)',
      placeholder: '0.625em',
    },
    'REM': {
      abbreviation: 'rem',
      type: 'relative',
      value: remValue,
      setter: setRemValue,
      multiplier: 1 / rootFontSize,
      label: 'rem (relative em quadrat)',
      placeholder: '0.625rem',
    },
    'TAILWIND': {
      abbreviation: 'tw',
      type: 'relative',
      value: tailwindValue,
      setter: setTailwindValue,
      multiplier: 0.25,
      label: 'tailwind',
      placeholder: '2.5',
    },
    'PT': {
      abbreviation: 'pt',
      type: 'absolute',
      value: ptValue,
      setter: setPtValue,
      multiplier: 72/96,
      label: 'pt (point)',
      placeholder: '7.5pt',
    },
    'PC': {
      abbreviation: 'pc',
      type: 'absolute',
      value: pcValue,
      setter: setPcValue,
      multiplier: 1/12 * (72/96),
      label: 'pc (pica)',
      placeholder: '7.5pt',
    },
    'MM': {
      abbreviation: 'mm',
      type: 'absolute',
      value: mmValue,
      setter: setMmValue,
      multiplier: 25.4 / ppi,
      label: 'mm (millimeter)',
      placeholder: '2.25mm',
    },
    'CM': {
      abbreviation: 'cm',
      type: 'absolute',
      value: cmValue,
      setter: setCmValue,
      multiplier: 2.54 / ppi,
      label: 'cm (centimeter)',
      placeholder: '0.225cm',
    },
    'IN': {
      abbreviation: 'in',
      type: 'absolute',
      value: inValue,
      setter: setInValue,
      multiplier: 1/ppi,
      label: 'in (inch)',
      placeholder: '0.225in',
    }
  }

  useEffect(() => {
    if (pxValue) {
      setRemValue(pxValue / rootFontSize);
    }
  }, [pxValue, rootFontSize]);

  useEffect(() => {
    if (pxValue) {
      Object.keys(units).forEach(key => {
        units[key].setter(pxValue * units[key].multiplier)
      })
    } else {
      Object.keys(units).forEach(key => {
        units[key].setter('')
      })
    }
  }, [pxValue]);


  Object.keys(units).forEach(key => {
    const state = units[key];
    useEffect(() => {
      if (!state.value === undefined) return;
      else if (state.value === '') setPxValue(state.value)
      else setPxValue(state.value / state.multiplier);
    }, [state.value])
  })

  const handlePxChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.value === '') setPxValue('')
    else setPxValue(parseInt(event.target.value))
  }

  const setStateFactory = (stateSetter: StateSetterType<number | ''>): ChangeEventHandler<HTMLInputElement> =>
    (event) => {
      switch (typeof event.target.value) {
        case 'string':
          if (event.target.value === '') stateSetter('');
          stateSetter(parseInt(event.target.value));
          break;
        case 'number':
          if (isNaN(event.target.value)) stateSetter(0);
          stateSetter(event.target.value);
          break;
        default:
          stateSetter(0);
      }
    }

  return (
    <main className={'px-8 py-6'}>
      <div className={'w-5/6 m-auto flex flex-col gap-8 justify-center my-auto h-full'}>
        <div className={'prose'}>
          <h1>CSS Unit converter</h1>
        </div>
        <Form className={'grid grid-cols-3'}>
          <div>
            <Label text={'px (pixel)'} htmlFor={'px'} />
            <InputGroup>
              <Input
                name={'px'}
                id={'px'}
                type={'number'}
                placeholder={'10px'}
                className={'input-primary'}
                value={pxValue}
                onChange={handlePxChange}
              />
              <span>PX</span>
            </InputGroup>
          </div>
          <div>
            <Label htmlFor={'ppi'} text={'ppi (pixels per inch)'} />
            <InputGroup>
              <Input
                id={'ppi'}
                name={'ppi'}
                type={'number'}
                value={ppi}
                onChange={(event) => setPpi(parseInt(event.target.value))}
                className={'input-accent'}
              />
              <span>PPI</span>
            </InputGroup>
          </div>
          <div>
            <Label htmlFor={'root_font_size'} text={'root font size'} />
            <InputGroup>
              <Input
                id={'root_font_size'}
                name={'root_font_size'}
                type={'number'}
                value={rootFontSize}
                onChange={(event) => setRootFontSize(parseInt(event.target.value))}
                className={'input-accent'}
              />
              <span>PT</span>
            </InputGroup>
          </div>
        </Form>
        <Form className={'flex gap-8'}>
          <div>
            <div className={'prose'}>
              <h2>Relative units</h2>
            </div>
            <div className={'grid grid-cols-2'}>
              {Object.keys(units)
                .map(key => units[key])
                .filter(unit => unit.type === 'relative')
                .map((unit, i) => (
                  <div key={i}>
                    <Label text={unit.label} htmlFor={unit.label}/>
                    <InputGroup>
                      <Input
                        name={unit.label}
                        id={unit.label}
                        type={'number'}
                        placeholder={unit.placeholder}
                        className={'input-secondary'}
                        value={unit.value}
                        onChange={setStateFactory(unit.setter)}
                      />
                      <span>{unit.abbreviation}</span>
                    </InputGroup>
                  </div>
                ))
              }
            </div>
          </div>
          <div>
            <div className={'prose'}>
              <h2>Absolute Units</h2>
            </div>
            <div className={'grid grid-cols-2'}>
              {Object.keys(units)
                .map(key => units[key])
                .filter(unit => unit.type === 'absolute')
                .map((unit, i) => (
                  <div key={i}>
                    <Label text={unit.label} htmlFor={unit.label}/>
                    <InputGroup>
                      <Input
                        name={unit.label}
                        id={unit.label}
                        type={'number'}
                        placeholder={unit.placeholder}
                        className={'input-secondary'}
                        value={unit.value}
                        onChange={setStateFactory(unit.setter)}
                      />
                      <span>{unit.abbreviation}</span>
                    </InputGroup>
                  </div>
                ))
              }
            </div>
          </div>
        </Form>
      </div>
    </main>
  )
}
