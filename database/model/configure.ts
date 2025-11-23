import { Schema, model, Document } from 'mongoose';
import mongoose from "../mongo";

/**
 * 基础配置表模型
 * 用于存储系统级别的键值对配置
 */
export interface Configure {
  id: number;               // 主键，自增
  key: string;              // 配置键，唯一
  value: string;            // 配置值
  description?: string;      // 配置描述（可选）
  createdAt: Date;         // 创建时间
  updatedAt: Date;         // 更新时间
}
export interface IConfigure extends Document {
  key: string;              // 配置键，唯一
  value: string;            // 配置值
  description?: string;      // 配置描述（可选）
  createdAt: Date;         // 创建时间
  updatedAt: Date;         // 更新时间
}

const ConfigureSchema = new Schema<IConfigure>({
  key: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  value: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true         // 自动管理 createdAt 和 updatedAt
});
const ConfigureModel = mongoose.model<IConfigure>('configure', ConfigureSchema);
export default ConfigureModel;

