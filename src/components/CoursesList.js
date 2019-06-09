import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';

import * as contentful from 'contentful'
import Course from '../components/Course'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import events from './events';
import dates from './dates';
import courses from './courses';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import LinearProgress from '@material-ui/core/LinearProgress';

import IconDown from "@material-ui/icons/ArrowDropDown";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


import Select from 'react-select';
import moment from 'moment';
import DateRangePicker from 'react-daterange-picker'
import 'react-daterange-picker/dist/css/react-calendar.css' // For some basic styling. (OPTIONAL)

import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/sass/styles.scss'
import './styles.scss'
import './courses.css'

const localizer = BigCalendar.momentLocalizer(moment)

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])


const stateDefinitions = {
  available: {
    color: null,
    label: 'Available',
  },
  enquire: {
    color: '#ffd200',
    label: 'Enquire',
  },
  unavailable: {
    selectable: false,
    color: '#78818b',
    label: 'Unavailable',
  },
};

const dateRanges = [
  {
    state: 'enquire',
    range: moment.range(
      moment().add(2, 'weeks').subtract(5, 'days'),
      moment().add(2, 'weeks').add(6, 'days')
    ),
  },
  {
    state: 'unavailable',
    range: moment.range(
      moment().add(3, 'weeks'),
      moment().add(3, 'weeks').add(5, 'days')
    ),
  },
];

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

 
class CoursesList extends React.Component {
    state = {
        value: 0,
        courses: [],
        stepikData:[],
        searchString: '',
        openListId: -1,
        srcId:-1,
        srcItem:null,
        srcList:[{label:'Stepik',value:0},{label:'Coursera',value:1},{label:'Udemy',value:2},{label:'Универсариум',value:3},{label:'Лекториум',value:4}],
        curName:'',
        curNote:'',
        curDate1:null,
        curDate2:null,
        dates:null,
        themes: [{label:'Книги',value:0},{label:'Курсы',value:1},{label:'Конкурсы',value:2},{label:'Воркшопы',value:3},{label:'Видео',value:4}],
        theme: null,
        currList: [],
        coursesList:courses,
    }
    constructor() {
        super()
        //this.getCourses()
        this.themeChange = this.themeChange.bind(this);
        this.srcChange = this.srcChange.bind(this);
        this.OpenListItem = this.OpenListItem.bind(this);
        this.textChange = this.textChange.bind(this);
        		this.date1Change = this.date1Change.bind(this);
		this.date2Change = this.date2Change.bind(this);
        
    }
    
    componentDidMount()
    {
        fetch('https://stepik.org/api/courses')
        .then(function(response) {
        console.log(response.headers.get('Content-Type')); // application/json; charset=utf-8
        console.log(response.status); // 200

        return response.json();
        })
        .then(data => {
			
        this.setState({stepikData:data.courses});    

        });

    }
    
    textChange(e)
	{
		if (e.target.name == "name")
			this.setState({curName:e.target.value});
			
		if (e.target.name == "notes")
			this.setState({curNote:e.target.value});	

			
	}
    
    date1Change(e)
	{
		
		let d = e.target.value;
		let res = d;
		this.setState({curDate1:d});
	
	}
	
	date2Change(e)
	{
		console.log(e.target.value);
		let d = e.target.value;
		this.setState({curDate2:d});
	}
    
    
    OpenListItem(e)
    {
        console.log(e);
        let crs = this.state.currList;
        
        this.setState({openListId:e,curName:crs[e].name,curNote:crs[e].note,curDate1:crs[e].date1, curDate2:crs[e].date2});
    }
    
    srcChange(e)
    {
        this.setState({srcItem:e});
    }
    
    themeChange(e)
    {
        let curTh = [];
        let cList = [];
        
        
        
        if (e!=null && e.value!=null) 
        {
            console.log(this.state.coursesList);
            for (let i=0;i<this.state.coursesList.length;i++)
                if (this.state.coursesList[i].id == e.value)
                {
                    cList = this.state.coursesList[i].courses;
                    break;
                }
            
        }
         this.setState({theme:e,currList:cList}); 
         
    }
   
      onSelect = dates => this.setState({dates})
      
      
      handleChange(event, newValue) {
    //setValue(newValue);
    console.log(newValue);
    this.setState({value:newValue});
    }
    
    callBackFunction = value => {
    console.log("The selection is  -> ", value);
  }
  
  SaveCur()
  {
        let crs = this.state.currList;
        const { openListId, curName,curNote, curDate1, curDate2} = this.state;
        crs[openListId].name = curName;
        crs[openListId].note = curNote;
        crs[openListId].date1 = curDate1;
        crs[openListId].date2 = curDate2;
            
        this.setState({currList:crs,curName:'',curNote:'',curDate1:null,curDate2:null,openListId:-1});
  }
  
  CancelCur()
  {
        this.setState({curName:'',curNote:'',curDate1:null,curDate2:null,openListId:-1});
  }
  
  
  
   handleSelect(range, states) {
    // range is a moment-range object
    console.log(range);
    
    this.setState({
      value: range,
      states: states,
    });
  }
    
    
    render() {
    
        const { currList, openListId, stepikData,srcItem, theme} = this.state;
        
        console.log(stepikData);
        
        console.log(localizer);
        
        var self = this;
    
        return (
            <div style={{width: 500}}>
             <Paper square>
                  <Tabs value={this.state.value} indicatorColor="primary" textColor="primary" onChange={this.handleChange.bind(this)}>
                    <Tab label="Календарь" style={{fontSize:16}} />
                    <Tab label="Задачи"  style={{fontSize:16}}/>
                    <Tab label="Платформы" style={{fontSize:16}}/>
                  </Tabs>
                </Paper>
                {this.state.value ==0 &&  <div style={{height: 500}}>
                  <BigCalendar
                    events={events}
                    views={["month"]}
                    step={60}
                    showMultiDayTimes
                    max={dates.add(dates.endOf(new Date(2019, 30, 6), 'day'), -1, 'hours')}
                    defaultDate={new Date(2019, 5, 8)}
                    components={{
                      timeSlotWrapper: ColoredDateCellWrapper,
                    }}
                    localizer={localizer}
                  />
                </div>}
                 {this.state.value ==1 && <div style={{width: 450, marginLeft: 10, marginTop: 10, borderRadius:5}}><Select
				isClearable
				placeholder="Категория"
			value={this.state.theme}
			onChange={this.themeChange}
			options={this.state.themes}
            style={{backgroundColor: '#331199'}}
			  />
              <List style={{overflow: 'auto'}}>
                        {currList && currList.map(function(item,index){

                        console.log(item);
                        
                        return (
                             <ListItem alignItems="flex-start" key={index} >
                             <div style={{width: 400,backgroundColor:'#fab49f',borderRadius:5, padding: 4}}>
                             <div style={{paddingLeft: 4,paddingTop:3, paddingRight: 4}}>{item.name}</div>
                             <div>
                             {item.tags.map(e=>(<div style={{fontSize:10,paddingLeft: 4}}>#{e}</div>))}
                             </div>
                             {openListId<0 && theme.value ==1 && <div style={{marginLeft:4}}>Дедлайн через {5+Math.floor(3*Math.random())} дней</div>}
                             {openListId<0 && <IconDown onClick={()=>self.OpenListItem(index)}/>}
                             {index == openListId && 
                             <div style={{backgroundColor:'#fab49f',backgroundRadius:5}}>
                             <TextField
                              autoFocus
                              margin="dense"
                              name="name"
                              label="Название"
                              fullWidth
                              value={self.state.curName} 
                              onChange={self.textChange}
                            />
                            <TextField
                              autoFocus
                              margin="dense"
                              name="notes"
                              label="Описание"
                              fullWidth
                              multiline={true}
                              value={self.state.curNote} 
                              onChange={self.textChange}
                            />
                            	<TextField
                                id="date1"
                                label="Дата начала"
                                type="date"
                                onChange={self.date1Change}
                                defaultValue="2019-01-01"
                                   InputProps={{ fontSize: 20,height: 100 }}
                              />
                                <TextField
                                id="date2"
                                label="Дата окончания"
                                type="date"
                                onChange={self.date2Change}
                                defaultValue="2019-01-01"
                                   InputProps={{ fontSize: 20,height: 100, marginLeft: 10 }}
                              /> 
                              <div style={{flex:1, flexDirection: 'row', marginTop: 10}}>
                              <Button       variant="outlined" color="primary" 
                                    onClick={self.SaveCur.bind(self)}>Сохранить</Button>
                                  <Button       variant="outlined" color="primary"  style={{marginLeft: 10}}
                                    onClick={self.CancelCur.bind(self)}>Отмена</Button>
                              </div>
                             </div>
                             }
                             </div>
                            </ListItem>
                            
                        )
                        })}
                        </List>  
            {theme &&  <div style={{justifyContent:'center',display: 'flex', alignItems: 'center' }}>
              <img  src="../images/plus.png"/>
              </div>}                        
              
              </div>}
                {this.state.value == 2 && 
                <div style={{width: 450, marginLeft: 10, marginTop: 10, borderRadius:5}}>
                <Select
				isClearable
				placeholder="Платформы"
			value={this.state.srcItem}
			onChange={this.srcChange}
			options={this.state.srcList}
            style={{backgroundColor: '#331199'}}
			  />
                <List style={{height:500, overflow: 'auto'}}>
                        {(srcItem && srcItem.value ==0) && stepikData && stepikData.map(function(item,index){

                        console.log(item);
                        
                        if (item.cover)
                        return (
                             <ListItem alignItems="flex-start" key={index} >
                                 <div style={{backgroundColor:'#fab49f',borderRadius:5, padding: 4, flex:1,flexDirection: 'row'}}>
                                 <img  style={{width: 50,height: 50}} src={"https://stepik.org/"+item.cover}/>
                                 <div>
                                 {item.title}
                                 </div>
                                 <div style={{marginTop: 10, fontSize: 10}}>
                                 {item.summary}
                                 </div>
                                 <div style={{marginTop: 10,marginBottom:10}}>
                                 <div>Выполнено: {index*10+50}%</div>
                                 <LinearProgress variant="determinate" value={index*10+50} />
                                 </div>
                                 </div>
                            </ListItem>
                            
                        )
                        })}
                        </List>    
                </div>
               }
                
                
                
            </div>
        )
    }
}
export default CoursesList;