let productionData = [
  // 2026-02-01
  { id: 1, date: '2026-02-01', line: 'Line A', machine: 'Machine A', totalIssued: 1000, totalProduction: 950, defective: 30, oee: 84.7, powerUtilize: 45.2 },
  { id: 2, date: '2026-02-01', line: 'Line B', machine: 'Machine B', totalIssued: 1100, totalProduction: 1050, defective: 25, oee: 88.1, powerUtilize: 52.8 },
  { id: 3, date: '2026-02-01', line: 'Line C', machine: 'Machine C', totalIssued: 950, totalProduction: 920, defective: 20, oee: 87.3, powerUtilize: 43.5 },
  { id: 4, date: '2026-02-01', line: 'Line D', machine: 'Machine D', totalIssued: 1200, totalProduction: 1150, defective: 35, oee: 87.5, powerUtilize: 58.3 },
  { id: 5, date: '2026-02-01', line: 'Line E', machine: 'Machine E', totalIssued: 1050, totalProduction: 1000, defective: 28, oee: 84.0, powerUtilize: 47.6 },
  { id: 6, date: '2026-02-01', line: 'Line F', machine: 'Machine F', totalIssued: 1150, totalProduction: 1100, defective: 32, oee: 86.7, powerUtilize: 54.1 },
  { id: 7, date: '2026-02-01', line: 'Line A', machine: 'Machine G', totalIssued: 980, totalProduction: 940, defective: 22, oee: 86.3, powerUtilize: 44.8 },
  { id: 8, date: '2026-02-01', line: 'Line B', machine: 'Machine H', totalIssued: 1080, totalProduction: 1030, defective: 27, oee: 85.1, powerUtilize: 51.2 },
  
  // 2026-02-02
  { id: 9, date: '2026-02-02', line: 'Line A', machine: 'Machine A', totalIssued: 1020, totalProduction: 970, defective: 28, oee: 85.2, powerUtilize: 46.1 },
  { id: 10, date: '2026-02-02', line: 'Line B', machine: 'Machine B', totalIssued: 1090, totalProduction: 1040, defective: 26, oee: 87.8, powerUtilize: 52.3 },
  { id: 11, date: '2026-02-02', line: 'Line C', machine: 'Machine C', totalIssued: 960, totalProduction: 930, defective: 22, oee: 86.9, powerUtilize: 44.2 },
  { id: 12, date: '2026-02-02', line: 'Line D', machine: 'Machine D', totalIssued: 1180, totalProduction: 1130, defective: 33, oee: 88.2, powerUtilize: 57.5 },
  { id: 13, date: '2026-02-02', line: 'Line E', machine: 'Machine E', totalIssued: 1040, totalProduction: 990, defective: 27, oee: 84.5, powerUtilize: 47.1 },
  { id: 14, date: '2026-02-02', line: 'Line F', machine: 'Machine F', totalIssued: 1140, totalProduction: 1090, defective: 31, oee: 86.3, powerUtilize: 53.4 },
  { id: 15, date: '2026-02-02', line: 'Line A', machine: 'Machine G', totalIssued: 990, totalProduction: 950, defective: 24, oee: 85.8, powerUtilize: 45.3 },
  { id: 16, date: '2026-02-02', line: 'Line B', machine: 'Machine H', totalIssued: 1070, totalProduction: 1020, defective: 29, oee: 84.9, powerUtilize: 50.8 },
  
  // 2026-02-03
  { id: 17, date: '2026-02-03', line: 'Line A', machine: 'Machine A', totalIssued: 1010, totalProduction: 960, defective: 29, oee: 84.8, powerUtilize: 45.7 },
  { id: 18, date: '2026-02-03', line: 'Line B', machine: 'Machine B', totalIssued: 1110, totalProduction: 1060, defective: 27, oee: 88.3, powerUtilize: 53.1 },
  { id: 19, date: '2026-02-03', line: 'Line C', machine: 'Machine C', totalIssued: 970, totalProduction: 940, defective: 23, oee: 87.1, powerUtilize: 44.6 },
  { id: 20, date: '2026-02-03', line: 'Line D', machine: 'Machine D', totalIssued: 1190, totalProduction: 1140, defective: 34, oee: 87.8, powerUtilize: 57.9 },
  { id: 21, date: '2026-02-03', line: 'Line E', machine: 'Machine E', totalIssued: 1060, totalProduction: 1010, defective: 30, oee: 84.2, powerUtilize: 48.0 },
  { id: 22, date: '2026-02-03', line: 'Line F', machine: 'Machine F', totalIssued: 1160, totalProduction: 1110, defective: 33, oee: 86.9, powerUtilize: 54.5 },
  { id: 23, date: '2026-02-03', line: 'Line A', machine: 'Machine G', totalIssued: 1000, totalProduction: 960, defective: 25, oee: 86.1, powerUtilize: 45.6 },
  { id: 24, date: '2026-02-03', line: 'Line B', machine: 'Machine H', totalIssued: 1090, totalProduction: 1040, defective: 28, oee: 85.3, powerUtilize: 51.5 },
  
  // 2026-02-04
  { id: 25, date: '2026-02-04', line: 'Line A', machine: 'Machine A', totalIssued: 1030, totalProduction: 980, defective: 31, oee: 85.0, powerUtilize: 46.6 },
  { id: 26, date: '2026-02-04', line: 'Line B', machine: 'Machine B', totalIssued: 1120, totalProduction: 1070, defective: 28, oee: 88.5, powerUtilize: 53.7 },
  { id: 27, date: '2026-02-04', line: 'Line C', machine: 'Machine C', totalIssued: 980, totalProduction: 950, defective: 24, oee: 87.4, powerUtilize: 45.1 },
  { id: 28, date: '2026-02-04', line: 'Line D', machine: 'Machine D', totalIssued: 1210, totalProduction: 1160, defective: 36, oee: 88.0, powerUtilize: 58.9 },
  { id: 29, date: '2026-02-04', line: 'Line E', machine: 'Machine E', totalIssued: 1070, totalProduction: 1020, defective: 32, oee: 84.6, powerUtilize: 48.5 },
  { id: 30, date: '2026-02-04', line: 'Line F', machine: 'Machine F', totalIssued: 1170, totalProduction: 1120, defective: 34, oee: 87.1, powerUtilize: 54.9 },
  { id: 31, date: '2026-02-04', line: 'Line A', machine: 'Machine G', totalIssued: 1010, totalProduction: 970, defective: 26, oee: 86.4, powerUtilize: 46.2 },
  { id: 32, date: '2026-02-04', line: 'Line B', machine: 'Machine H', totalIssued: 1100, totalProduction: 1050, defective: 30, oee: 85.6, powerUtilize: 52.1 },
  
  // 2026-02-05
  { id: 33, date: '2026-02-05', line: 'Line A', machine: 'Machine A', totalIssued: 1040, totalProduction: 990, defective: 32, oee: 85.3, powerUtilize: 47.1 },
  { id: 34, date: '2026-02-05', line: 'Line B', machine: 'Machine B', totalIssued: 1130, totalProduction: 1080, defective: 29, oee: 88.7, powerUtilize: 54.2 },
  { id: 35, date: '2026-02-05', line: 'Line C', machine: 'Machine C', totalIssued: 990, totalProduction: 960, defective: 25, oee: 87.6, powerUtilize: 45.6 },
  { id: 36, date: '2026-02-05', line: 'Line D', machine: 'Machine D', totalIssued: 1220, totalProduction: 1170, defective: 37, oee: 88.3, powerUtilize: 59.4 },
  { id: 37, date: '2026-02-05', line: 'Line E', machine: 'Machine E', totalIssued: 1080, totalProduction: 1030, defective: 33, oee: 84.8, powerUtilize: 49.0 },
  { id: 38, date: '2026-02-05', line: 'Line F', machine: 'Machine F', totalIssued: 1180, totalProduction: 1130, defective: 35, oee: 87.3, powerUtilize: 55.4 },
  { id: 39, date: '2026-02-05', line: 'Line A', machine: 'Machine G', totalIssued: 1020, totalProduction: 980, defective: 27, oee: 86.6, powerUtilize: 46.7 },
  { id: 40, date: '2026-02-05', line: 'Line B', machine: 'Machine H', totalIssued: 1110, totalProduction: 1060, defective: 31, oee: 85.8, powerUtilize: 52.6 },
  
  // 2026-02-06
  { id: 41, date: '2026-02-06', line: 'Line A', machine: 'Machine A', totalIssued: 1050, totalProduction: 1000, defective: 33, oee: 85.5, powerUtilize: 47.6 },
  { id: 42, date: '2026-02-06', line: 'Line B', machine: 'Machine B', totalIssued: 1140, totalProduction: 1090, defective: 30, oee: 88.9, powerUtilize: 54.7 },
  { id: 43, date: '2026-02-06', line: 'Line C', machine: 'Machine C', totalIssued: 1000, totalProduction: 970, defective: 26, oee: 87.8, powerUtilize: 46.1 },
  { id: 44, date: '2026-02-06', line: 'Line D', machine: 'Machine D', totalIssued: 1230, totalProduction: 1180, defective: 38, oee: 88.5, powerUtilize: 59.9 },
  { id: 45, date: '2026-02-06', line: 'Line E', machine: 'Machine E', totalIssued: 1090, totalProduction: 1040, defective: 34, oee: 85.0, powerUtilize: 49.5 },
  { id: 46, date: '2026-02-06', line: 'Line F', machine: 'Machine F', totalIssued: 1190, totalProduction: 1140, defective: 36, oee: 87.5, powerUtilize: 55.9 },
  { id: 47, date: '2026-02-06', line: 'Line A', machine: 'Machine G', totalIssued: 1030, totalProduction: 990, defective: 28, oee: 86.8, powerUtilize: 47.2 },
  { id: 48, date: '2026-02-06', line: 'Line B', machine: 'Machine H', totalIssued: 1120, totalProduction: 1070, defective: 32, oee: 86.0, powerUtilize: 53.1 },
  
  // 2026-02-07
  { id: 49, date: '2026-02-07', line: 'Line A', machine: 'Machine A', totalIssued: 1060, totalProduction: 1010, defective: 34, oee: 85.7, powerUtilize: 48.1 },
  { id: 50, date: '2026-02-07', line: 'Line B', machine: 'Machine B', totalIssued: 1150, totalProduction: 1100, defective: 31, oee: 89.1, powerUtilize: 55.2 },
  { id: 51, date: '2026-02-07', line: 'Line C', machine: 'Machine C', totalIssued: 1010, totalProduction: 980, defective: 27, oee: 88.0, powerUtilize: 46.6 },
  { id: 52, date: '2026-02-07', line: 'Line D', machine: 'Machine D', totalIssued: 1240, totalProduction: 1190, defective: 39, oee: 88.7, powerUtilize: 60.4 },
  { id: 53, date: '2026-02-07', line: 'Line E', machine: 'Machine E', totalIssued: 1100, totalProduction: 1050, defective: 35, oee: 85.2, powerUtilize: 50.0 },
  { id: 54, date: '2026-02-07', line: 'Line F', machine: 'Machine F', totalIssued: 1200, totalProduction: 1150, defective: 37, oee: 87.7, powerUtilize: 56.4 },
  { id: 55, date: '2026-02-07', line: 'Line A', machine: 'Machine G', totalIssued: 1040, totalProduction: 1000, defective: 29, oee: 87.0, powerUtilize: 47.7 },
  { id: 56, date: '2026-02-07', line: 'Line B', machine: 'Machine H', totalIssued: 1130, totalProduction: 1080, defective: 33, oee: 86.2, powerUtilize: 53.6 },
  
  // 2026-02-08
  { id: 57, date: '2026-02-08', line: 'Line A', machine: 'Machine A', totalIssued: 1070, totalProduction: 1020, defective: 35, oee: 85.9, powerUtilize: 48.6 },
  { id: 58, date: '2026-02-08', line: 'Line B', machine: 'Machine B', totalIssued: 1160, totalProduction: 1110, defective: 32, oee: 89.3, powerUtilize: 55.7 },
  { id: 59, date: '2026-02-08', line: 'Line C', machine: 'Machine C', totalIssued: 1020, totalProduction: 990, defective: 28, oee: 88.2, powerUtilize: 47.1 },
  { id: 60, date: '2026-02-08', line: 'Line D', machine: 'Machine D', totalIssued: 1250, totalProduction: 1200, defective: 40, oee: 88.9, powerUtilize: 60.9 },
  { id: 61, date: '2026-02-08', line: 'Line E', machine: 'Machine E', totalIssued: 1110, totalProduction: 1060, defective: 36, oee: 85.4, powerUtilize: 50.5 },
  { id: 62, date: '2026-02-08', line: 'Line F', machine: 'Machine F', totalIssued: 1210, totalProduction: 1160, defective: 38, oee: 87.9, powerUtilize: 56.9 },
  { id: 63, date: '2026-02-08', line: 'Line A', machine: 'Machine G', totalIssued: 1050, totalProduction: 1010, defective: 30, oee: 87.2, powerUtilize: 48.2 },
  { id: 64, date: '2026-02-08', line: 'Line B', machine: 'Machine H', totalIssued: 1140, totalProduction: 1090, defective: 34, oee: 86.4, powerUtilize: 54.1 },
  
  // 2026-02-09
  { id: 65, date: '2026-02-09', line: 'Line A', machine: 'Machine A', totalIssued: 1080, totalProduction: 1030, defective: 36, oee: 86.1, powerUtilize: 49.1 },
  { id: 66, date: '2026-02-09', line: 'Line B', machine: 'Machine B', totalIssued: 1170, totalProduction: 1120, defective: 33, oee: 89.5, powerUtilize: 56.2 },
  { id: 67, date: '2026-02-09', line: 'Line C', machine: 'Machine C', totalIssued: 1030, totalProduction: 1000, defective: 29, oee: 88.4, powerUtilize: 47.6 },
  { id: 68, date: '2026-02-09', line: 'Line D', machine: 'Machine D', totalIssued: 1260, totalProduction: 1210, defective: 38, oee: 89.1, powerUtilize: 61.4 },
  { id: 69, date: '2026-02-09', line: 'Line E', machine: 'Machine E', totalIssued: 1120, totalProduction: 1070, defective: 37, oee: 85.6, powerUtilize: 51.0 },
  { id: 70, date: '2026-02-09', line: 'Line F', machine: 'Machine F', totalIssued: 1220, totalProduction: 1170, defective: 39, oee: 88.1, powerUtilize: 57.4 },
  { id: 71, date: '2026-02-09', line: 'Line A', machine: 'Machine G', totalIssued: 1060, totalProduction: 1020, defective: 31, oee: 87.4, powerUtilize: 48.7 },
  { id: 72, date: '2026-02-09', line: 'Line B', machine: 'Machine H', totalIssued: 1150, totalProduction: 1100, defective: 35, oee: 86.6, powerUtilize: 54.6 },
  
  // 2026-02-10
  { id: 73, date: '2026-02-10', line: 'Line A', machine: 'Machine A', totalIssued: 1090, totalProduction: 1040, defective: 37, oee: 86.3, powerUtilize: 49.6 },
  { id: 74, date: '2026-02-10', line: 'Line B', machine: 'Machine B', totalIssued: 1180, totalProduction: 1130, defective: 34, oee: 89.7, powerUtilize: 56.7 },
  { id: 75, date: '2026-02-10', line: 'Line C', machine: 'Machine C', totalIssued: 1040, totalProduction: 1010, defective: 30, oee: 88.6, powerUtilize: 48.1 },
  { id: 76, date: '2026-02-10', line: 'Line D', machine: 'Machine D', totalIssued: 1270, totalProduction: 1220, defective: 39, oee: 89.3, powerUtilize: 61.9 },
  { id: 77, date: '2026-02-10', line: 'Line E', machine: 'Machine E', totalIssued: 1130, totalProduction: 1080, defective: 38, oee: 85.8, powerUtilize: 51.5 },
  { id: 78, date: '2026-02-10', line: 'Line F', machine: 'Machine F', totalIssued: 1230, totalProduction: 1180, defective: 40, oee: 88.3, powerUtilize: 57.9 },
  { id: 79, date: '2026-02-10', line: 'Line A', machine: 'Machine G', totalIssued: 1070, totalProduction: 1030, defective: 32, oee: 87.6, powerUtilize: 49.2 },
  { id: 80, date: '2026-02-10', line: 'Line B', machine: 'Machine H', totalIssued: 1160, totalProduction: 1110, defective: 36, oee: 86.8, powerUtilize: 55.1 },
  
  // 2026-02-11
  { id: 81, date: '2026-02-11', line: 'Line A', machine: 'Machine A', totalIssued: 1100, totalProduction: 1050, defective: 38, oee: 86.5, powerUtilize: 50.1 },
  { id: 82, date: '2026-02-11', line: 'Line B', machine: 'Machine B', totalIssued: 1190, totalProduction: 1140, defective: 35, oee: 89.9, powerUtilize: 57.2 },
  { id: 83, date: '2026-02-11', line: 'Line C', machine: 'Machine C', totalIssued: 1050, totalProduction: 1020, defective: 31, oee: 88.8, powerUtilize: 48.6 },
  { id: 84, date: '2026-02-11', line: 'Line D', machine: 'Machine D', totalIssued: 1280, totalProduction: 1230, defective: 40, oee: 89.5, powerUtilize: 62.4 },
  { id: 85, date: '2026-02-11', line: 'Line E', machine: 'Machine E', totalIssued: 1140, totalProduction: 1090, defective: 39, oee: 86.0, powerUtilize: 52.0 },
  { id: 86, date: '2026-02-11', line: 'Line F', machine: 'Machine F', totalIssued: 1240, totalProduction: 1190, defective: 38, oee: 88.5, powerUtilize: 58.4 },
  { id: 87, date: '2026-02-11', line: 'Line A', machine: 'Machine G', totalIssued: 1080, totalProduction: 1040, defective: 33, oee: 87.8, powerUtilize: 49.7 },
  { id: 88, date: '2026-02-11', line: 'Line B', machine: 'Machine H', totalIssued: 1170, totalProduction: 1120, defective: 37, oee: 87.0, powerUtilize: 55.6 },
  
  // 2026-02-12
  { id: 89, date: '2026-02-12', line: 'Line A', machine: 'Machine A', totalIssued: 1110, totalProduction: 1060, defective: 39, oee: 86.7, powerUtilize: 50.6 },
  { id: 90, date: '2026-02-12', line: 'Line B', machine: 'Machine B', totalIssued: 1200, totalProduction: 1150, defective: 36, oee: 90.1, powerUtilize: 57.7 },
  { id: 91, date: '2026-02-12', line: 'Line C', machine: 'Machine C', totalIssued: 1060, totalProduction: 1030, defective: 32, oee: 89.0, powerUtilize: 49.1 },
  { id: 92, date: '2026-02-12', line: 'Line D', machine: 'Machine D', totalIssued: 1290, totalProduction: 1240, defective: 38, oee: 89.7, powerUtilize: 62.9 },
  { id: 93, date: '2026-02-12', line: 'Line E', machine: 'Machine E', totalIssued: 1150, totalProduction: 1100, defective: 40, oee: 86.2, powerUtilize: 52.5 },
  { id: 94, date: '2026-02-12', line: 'Line F', machine: 'Machine F', totalIssued: 1250, totalProduction: 1200, defective: 39, oee: 88.7, powerUtilize: 58.9 },
  { id: 95, date: '2026-02-12', line: 'Line A', machine: 'Machine G', totalIssued: 1090, totalProduction: 1050, defective: 34, oee: 88.0, powerUtilize: 50.2 },
  { id: 96, date: '2026-02-12', line: 'Line B', machine: 'Machine H', totalIssued: 1180, totalProduction: 1130, defective: 38, oee: 87.2, powerUtilize: 56.1 },
  
  // 2026-02-13
  { id: 97, date: '2026-02-13', line: 'Line A', machine: 'Machine A', totalIssued: 1120, totalProduction: 1070, defective: 40, oee: 86.9, powerUtilize: 51.1 },
  { id: 98, date: '2026-02-13', line: 'Line B', machine: 'Machine B', totalIssued: 1210, totalProduction: 1160, defective: 37, oee: 90.3, powerUtilize: 58.2 },
  { id: 99, date: '2026-02-13', line: 'Line C', machine: 'Machine C', totalIssued: 1070, totalProduction: 1040, defective: 33, oee: 89.2, powerUtilize: 49.6 },
  { id: 100, date: '2026-02-13', line: 'Line D', machine: 'Machine D', totalIssued: 1300, totalProduction: 1250, defective: 39, oee: 89.9, powerUtilize: 63.4 },
  { id: 101, date: '2026-02-13', line: 'Line E', machine: 'Machine E', totalIssued: 1160, totalProduction: 1110, defective: 38, oee: 86.4, powerUtilize: 53.0 },
  { id: 102, date: '2026-02-13', line: 'Line F', machine: 'Machine F', totalIssued: 1260, totalProduction: 1210, defective: 40, oee: 88.9, powerUtilize: 59.4 },
  { id: 103, date: '2026-02-13', line: 'Line A', machine: 'Machine G', totalIssued: 1100, totalProduction: 1060, defective: 35, oee: 88.2, powerUtilize: 50.7 },
  { id: 104, date: '2026-02-13', line: 'Line B', machine: 'Machine H', totalIssued: 1190, totalProduction: 1140, defective: 39, oee: 87.4, powerUtilize: 56.6 },
  
  // 2026-02-14
  { id: 105, date: '2026-02-14', line: 'Line A', machine: 'Machine A', totalIssued: 1130, totalProduction: 1080, defective: 38, oee: 87.1, powerUtilize: 51.6 },
  { id: 106, date: '2026-02-14', line: 'Line B', machine: 'Machine B', totalIssued: 1220, totalProduction: 1170, defective: 38, oee: 90.5, powerUtilize: 58.7 },
  { id: 107, date: '2026-02-14', line: 'Line C', machine: 'Machine C', totalIssued: 1080, totalProduction: 1050, defective: 34, oee: 89.4, powerUtilize: 50.1 },
  { id: 108, date: '2026-02-14', line: 'Line D', machine: 'Machine D', totalIssued: 1310, totalProduction: 1260, defective: 40, oee: 90.1, powerUtilize: 63.9 },
  { id: 109, date: '2026-02-14', line: 'Line E', machine: 'Machine E', totalIssued: 1170, totalProduction: 1120, defective: 39, oee: 86.6, powerUtilize: 53.5 },
  { id: 110, date: '2026-02-14', line: 'Line F', machine: 'Machine F', totalIssued: 1270, totalProduction: 1220, defective: 38, oee: 89.1, powerUtilize: 59.9 },
  { id: 111, date: '2026-02-14', line: 'Line A', machine: 'Machine G', totalIssued: 1110, totalProduction: 1070, defective: 36, oee: 88.4, powerUtilize: 51.2 },
  { id: 112, date: '2026-02-14', line: 'Line B', machine: 'Machine H', totalIssued: 1200, totalProduction: 1150, defective: 40, oee: 87.6, powerUtilize: 57.1 },
  
  // 2026-02-15
  { id: 113, date: '2026-02-15', line: 'Line A', machine: 'Machine A', totalIssued: 1140, totalProduction: 1090, defective: 39, oee: 87.3, powerUtilize: 51.8 },
  { id: 114, date: '2026-02-15', line: 'Line B', machine: 'Machine B', totalIssued: 1230, totalProduction: 1180, defective: 39, oee: 90.7, powerUtilize: 59.2 },
  { id: 115, date: '2026-02-15', line: 'Line C', machine: 'Machine C', totalIssued: 1090, totalProduction: 1060, defective: 35, oee: 89.6, powerUtilize: 50.4 },
  { id: 116, date: '2026-02-15', line: 'Line D', machine: 'Machine D', totalIssued: 1320, totalProduction: 1270, defective: 38, oee: 90.3, powerUtilize: 64.5 },
  { id: 117, date: '2026-02-15', line: 'Line E', machine: 'Machine E', totalIssued: 1180, totalProduction: 1130, defective: 40, oee: 86.8, powerUtilize: 53.7 },
  { id: 118, date: '2026-02-15', line: 'Line F', machine: 'Machine F', totalIssued: 1280, totalProduction: 1230, defective: 39, oee: 89.3, powerUtilize: 60.3 },
  { id: 119, date: '2026-02-15', line: 'Line A', machine: 'Machine G', totalIssued: 1120, totalProduction: 1080, defective: 37, oee: 88.6, powerUtilize: 51.4 },
  { id: 120, date: '2026-02-15', line: 'Line B', machine: 'Machine H', totalIssued: 1210, totalProduction: 1160, defective: 38, oee: 87.8, powerUtilize: 57.6 }
];

module.exports = { productionData };
