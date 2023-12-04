#!/usr/bin/env node
import { dataProcess } from './core/dataProcess.js';

const checkinDate = process.argv[2]

dataProcess(checkinDate)