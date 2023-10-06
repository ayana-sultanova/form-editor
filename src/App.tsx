import React, {useState} from 'react';
import './styles.scss'

interface Param {
  id: number;
  name: string;
  type: string; // Добавлены новые типы параметров
  options?: string[]; // Опции для типа 'select'
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  // другие поля
}

interface FormProps {
  params: Param[];
  model: Model;
}

const App: React.FC = () => {
  const params =
      [
        {
          id: 1,
          name: 'Назначение',
          type: 'string',
        },
        {
          id: 2,
          name: 'Длина',
          type: 'string',
        },
        {
          id: 3,
          name: 'Цвет',
          type: 'select',
          options: ['Красный', 'Синий', 'Зеленый'],
        },
      ];
  const model =
      {
        "paramValues": [
          {
            "paramId": 1,
            "value": "Повседневное"
          },
          {
            "paramId": 2,
            "value": "Макси"
          },
          {
            "paramId": 3,
            "value": "Красный"
          }
        ]
      }
  return <div className='wrapper'>
    <Form params={params} model={model}/>
  </div>
}
const Form: React.FC<FormProps> = ({params, model}) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>(model.paramValues);

  const handleChange = (paramId: number, value: string) => {
    const updatedParamValues = paramValues.map(param => {
      if (param.paramId === paramId) {
        return {...param, value};
      }
      return param;
    });
    setParamValues(updatedParamValues);
  };

  const getModel = (): Model => {
    return {
      paramValues: paramValues,
      // другие поля из модели, если есть
    };
  };

  console.log(getModel())

  return (
      <div className='form'>
        {params.map(param => (
            <div key={param.id} className='form-block'>
              <label className='form-block__label'>{param.name}</label>
              {param.type === 'select' ? (
                  <Select paramValues={paramValues} param={param} handleChange={handleChange} />
              ) : (
                  <Input paramValues={paramValues} param={param} handleChange={handleChange} />
              )}
            </div>
        ))}
        {/* другие поля из модели, если есть */}
      </div>
  );
};

interface ChildProps {
  paramValues: ParamValue [];
  param: Param;
  handleChange: (id: number, value: string) => void;
}

const Select:React.FC<ChildProps> = ({param, paramValues, handleChange}) => {
  return <select
      className='form-block__input select'
      value={paramValues.find(pv => pv.paramId === param.id)?.value || ''}
      onChange={e => handleChange(param.id, e.target.value)}
  >
    {param.options?.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
    ))}
  </select>
};

const Input:React.FC<ChildProps> = ({param, paramValues, handleChange}) => {
  return <input
      className='form-block__input'
      type="text"
      value={paramValues.find(pv => pv.paramId === param.id)?.value || ''}
      onChange={e => handleChange(param.id, e.target.value)}
  />
}

export default App
