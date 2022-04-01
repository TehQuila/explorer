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
      100, 0, "test-100", "test-100", [700, 700], [
        new ComponentObject(101, 0, "test-101", "test-100.test-101", [0, 0], [], [], []),
        new ComponentObject(102, 1, "test-102", "test-100.test-102", [0, 0], [], [], []),
        new ComponentObject(103, 2, "test-103", "test-100.test-103", [0, 0], [], [], []),
        new ComponentObject(104, 3, "test-104", "test-100.test-104", [0, 0], [], [], []),
        new ComponentObject(105, 4, "test-105", "test-100.test-105", [0, 0], [], [], []),
        new ComponentObject(106, 5, "test-106", "test-100.test-106", [0, 0], [], [], []),
        new ComponentObject(107, 6, "test-107", "test-100.test-107", [0, 0], [], [], []),
        new ComponentObject(108, 7, "test-108", "test-100.test-108", [0, 0], [], [], []),
        new ComponentObject(109, 8, "test-109", "test-100.test-109", [0, 0], [], [], []),
        new ComponentObject(110, 9, "test-110", "test-100.test-110", [0, 0], [], [], []),
        new ComponentObject(111, 10, "test-111", "test-100.test-111", [0, 0], [], [], []),
        new ComponentObject(112, 11, "test-112", "test-100.test-112", [0, 0], [], [], []),
        new ComponentObject(113, 12, "test-113", "test-100.test-113", [0, 0], [], [], []),
        /*
        new ComponentObject(114, 0, "test-114", "test-100.test-114", [0, 0], [], [], []),
        new ComponentObject(115, 0, "test-115", "test-100.test-115", [0, 0], [], [], []),
        new ComponentObject(116, 0, "test-116", "test-100.test-116", [0, 0], [], [], []),
        new ComponentObject(117, 0, "test-117", "test-100.test-117", [0, 0], [], [], []),
        new ComponentObject(118, 0, "test-118", "test-100.test-118", [0, 0], [], [], [])
         */
      ], [], [
        new RelationObject(119, 101, 102, [], "", ""),
        new RelationObject(120, 102, 103, [], "", ""),
        new RelationObject(121, 103, 104, [], "", ""),
        new RelationObject(122, 104, 105, [], "", ""),
        new RelationObject(123, 105, 106, [], "", ""),
        new RelationObject(124, 106, 107, [], "", ""),
        new RelationObject(125, 107, 108, [], "", ""),
        new RelationObject(126, 108, 101, [], "", ""),
        new RelationObject(127, 108, 109, [], "", ""),
        new RelationObject(128, 109, 110, [], "", ""),
        new RelationObject(129, 110, 105, [], "", ""),
        new RelationObject(131, 110, 111, [], "", ""),
        new RelationObject(132, 111, 112, [], "", ""),
        new RelationObject(133, 112, 113, [], "", ""),
        new RelationObject(134, 113, 109, [], "", ""),
        /*
        new RelationObject(135, 113, 114, [], "", ""),
        new RelationObject(136, 114, 115, [], "", ""),
        new RelationObject(137, 114, 116, [], "", ""),
        new RelationObject(138, 116, 117, [], "", ""),
        new RelationObject(139, 116, 118, [], "", "")
         */
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
