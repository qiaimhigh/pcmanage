import   Mock  from 'mockjs';
import homeAPi  from './mockServeData'
Mock.mock('/home/getData',homeAPi.getStatisticalData())