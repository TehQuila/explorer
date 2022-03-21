import { Injectable } from '@angular/core';
import {ComponentObject} from "../component-tree/rendering/component-object";
import {RelationObject} from "../component-tree/rendering/relation-object";

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  constructor() { }

  public getComponentTree(): ComponentObject{
    return new ComponentObject(
      100, 0, "test-100", "test-100", [0, 0], [
        new ComponentObject(101, 0, "test-101", "test-100.test-101", [0, 0], [], [], []),
        new ComponentObject(102, 0, "test-102", "test-100.test-102", [0, 0], [], [], []),
        new ComponentObject(103, 0, "test-103", "test-100.test-103", [0, 0], [], [], []),
        new ComponentObject(104, 0, "test-104", "test-100.test-104", [0, 0], [], [], []),
        new ComponentObject(105, 0, "test-105", "test-100.test-105", [0, 0], [], [], []),
        new ComponentObject(106, 0, "test-106", "test-100.test-106", [0, 0], [], [], []),
        new ComponentObject(107, 0, "test-107", "test-100.test-107", [0, 0], [], [], []),
        new ComponentObject(108, 0, "test-108", "test-100.test-108", [0, 0], [], [], []),
        new ComponentObject(109, 0, "test-109", "test-100.test-109", [0, 0], [], [], []),
        new ComponentObject(110, 0, "test-110", "test-100.test-110", [0, 0], [], [], []),
        new ComponentObject(111, 0, "test-111", "test-100.test-111", [0, 0], [], [], []),
        new ComponentObject(112, 0, "test-112", "test-100.test-112", [0, 0], [], [], []),
        new ComponentObject(113, 0, "test-113", "test-100.test-113", [0, 0], [], [], []),
        new ComponentObject(114, 0, "test-114", "test-100.test-114", [0, 0], [], [], []),
        new ComponentObject(115, 0, "test-115", "test-100.test-115", [0, 0], [], [], []),
        new ComponentObject(116, 0, "test-116", "test-100.test-116", [0, 0], [], [], []),
        new ComponentObject(117, 0, "test-117", "test-100.test-117", [0, 0], [], [], []),
        new ComponentObject(118, 0, "test-118", "test-100.test-118", [0, 0], [], [], [])
      ], [], [
        new RelationObject(101, 102, [], "", ""),
        new RelationObject(102, 103, [], "", ""),
        new RelationObject(103, 104, [], "", ""),
        new RelationObject(104, 105, [], "", ""),
        new RelationObject(105, 106, [], "", ""),
        new RelationObject(106, 107, [], "", ""),
        new RelationObject(107, 108, [], "", ""),
        new RelationObject(108, 101, [], "", ""),
        new RelationObject(108, 109, [], "", ""),
        new RelationObject(109, 110, [], "", ""),
        new RelationObject(110, 105, [], "", ""),
        new RelationObject(110, 111, [], "", ""),
        new RelationObject(111, 112, [], "", ""),
        new RelationObject(112, 113, [], "", ""),
        new RelationObject(113, 109, [], "", ""),
        new RelationObject(113, 114, [], "", ""),
        new RelationObject(114, 115, [], "", ""),
        new RelationObject(114, 116, [], "", ""),
        new RelationObject(116, 117, [], "", ""),
        new RelationObject(116, 118, [], "", "")
      ]);
  }

  /*
  private static methDataToString(meth: MethodData) {
    let methodString = meth.name + '(';
    const last = meth.params.length - 1;
    for (let i = 0; i < meth.params.length; i++) {
      methodString += meth.params[i].toString();
      if (i < last) {
        methodString += ', ';
      }
    }
    methodString += ')';

    return methodString;
  }



  private static varDataToString(param: VariableData) {
    if (param.type) {
      return param.name + ': ' + param.type;
    } else {
      return param.name;
    }
  }
   */
}
